namespace FarmWebApp.Controllers;

using FarmWebApp.Data;
using FarmWebApp.Exceptions;
using FarmWebApp.Models;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("animals")]
public class AnimalsController : ControllerBase
{
    private readonly IAnimalsStorage animalsStorage;

    public AnimalsController(IAnimalsStorage animalsStorage)
    {
        this.animalsStorage = animalsStorage;
    }

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var animals = await this.animalsStorage.GetAll(cancellationToken);
        var animalsDtos = animals.Select(ToDto).ToArray();
        return this.Ok(animalsDtos);
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] AddAnimalRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await this.animalsStorage.Add(request.Name!, cancellationToken);
            return this.Created();
        }
        catch (ArgumentException ex)
        {
            return this.BadRequest(ex.Message);
        }
        catch (DuplicateEntityException ex)
        {
            return this.Conflict(ex.Message);
        }
    }

    [HttpDelete]
    [Route("{name}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string name, CancellationToken cancellationToken)
    {
        try
        {
            await this.animalsStorage.Remove(name, cancellationToken);
            return this.Ok();
        }
        catch (EntityNotFoundException ex)
        {
            return this.NotFound(ex.Message);
        }
    }

    private static AnimalDto ToDto(Animal entity)
    {
        return new AnimalDto
        {
            Name = entity.Name
        };
    }
}
