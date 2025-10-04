namespace TaxCalculation.Application
{
    public class TaxResponse
    {
        public string CostCentre { get; set; } = "UNKNOWN";
        public decimal Total { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal SaleTax { get; set; }
        public decimal TotalExcludingTax { get; set; }
    }
}
