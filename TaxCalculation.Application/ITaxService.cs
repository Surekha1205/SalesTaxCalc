using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaxCalculation.Application
{
    public interface ITaxService
    {
        Dictionary<string,string> ExtractInput(string input);
        TaxResponse CalculateTax(decimal taxRate, string input);
    }
}
