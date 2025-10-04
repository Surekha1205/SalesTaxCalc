using TaxCalculation.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace TaxCalculation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculateTaxController : ControllerBase
    {
        private readonly ITaxService _taxService;

        public CalculateTaxController(ITaxService taxService)
        {
            _taxService = taxService;
        }

        [HttpPost]
        
        public IActionResult CalculateTaxDetails(decimal taxRate, string emailOrTextInput)
        {
            try
            {
                if (taxRate < 0 || string.IsNullOrEmpty(emailOrTextInput))
                {
                    return BadRequest("Input is not valid");
                }

                var data = _taxService.CalculateTax(taxRate, emailOrTextInput); // (taxRate, emailOrTextInput);
                return Ok(data);
            }
            catch(InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch(Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
            
        }
    }
}
