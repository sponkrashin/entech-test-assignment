namespace FarmWebApp.Controllers;

using FarmWebApp.Models;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("animals")]
public class AnimalsController : ControllerBase
{
    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        return this.Ok(Array.Empty<AnimalDto>());
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> Create([FromBody] AddAnimalRequest request, CancellationToken cancellationToken)
    {
        return this.Ok(null);
    }

    [HttpDelete]
    [Route("{name}")]
    public async Task<IActionResult> Delete(string name, CancellationToken cancellationToken)
    {
        return this.Ok();
    }
}
