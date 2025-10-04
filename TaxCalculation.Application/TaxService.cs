using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TaxCalculation.Application
{
    public class TaxService:ITaxService
    {
        //private const decimal _taxRate = 0.10m;

        public Dictionary<string,string> ExtractInput(string input)
        {
            var actualInput = new Dictionary<string,string>();

            var settings = new XmlReaderSettings
            {
                ConformanceLevel = ConformanceLevel.Fragment,
                IgnoreWhitespace = true,
                IgnoreComments = true
            };
            try
            {
                using var reader = XmlReader.Create(new StringReader(input), settings);
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element)
                    {
                        // to read the xml from reader and as XElement
                        var element = XElement.ReadFrom(reader) as XElement;

                        if (element != null)
                        {
                            if (element.HasElements)
                            {
                                // Parent node with children
                                foreach (var child in element.Elements())
                                {
                                    actualInput[child.Name.LocalName] = child.Value.Trim();
                                }
                            }
                            else
                            {
                                // Simple node 
                                actualInput[element.Name.LocalName] = element.Value.Trim();
                            }
                        }
                    }
                }
                if(!actualInput.ContainsKey("total")|| string.IsNullOrWhiteSpace(actualInput["total"])) {
                    throw new InvalidOperationException("Total is missing, rejecting this input");
                }
                if (!actualInput.ContainsKey("cost_centre") || string.IsNullOrEmpty(actualInput["cost_centre"]))
                {
                    actualInput["cost_centre"] = "UNKNOWN";
                }
            }
            catch (XmlException)
            {
                throw new InvalidOperationException("Invalid or Malformed XML. Input is rejected");
            }
            return actualInput;
        }        

        public TaxResponse CalculateTax(decimal taxRate, string input)
        {
            taxRate = taxRate / 100;
            var extractedInput = ExtractInput(input);
            var taxResponse = new TaxResponse
            {
                CostCentre = extractedInput.ContainsKey("cost_centre") ? extractedInput["cost_centre"] : "UNKNOWN",
                Total = decimal.Parse(extractedInput["total"]),
                PaymentMethod = extractedInput.ContainsKey("payment_method") ? extractedInput["payment_method"] : string.Empty
            };
            taxResponse.TotalExcludingTax = Math.Round(taxResponse.Total / (1 + taxRate), 2);
            taxResponse.SaleTax = Math.Round(taxResponse.Total - taxResponse.TotalExcludingTax, 2);
            
            return taxResponse;
        }
    }
}
