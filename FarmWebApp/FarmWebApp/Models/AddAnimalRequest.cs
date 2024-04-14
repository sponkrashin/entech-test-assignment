namespace FarmWebApp.Models;

using System.ComponentModel.DataAnnotations;

public class AddAnimalRequest
{
    [Required]
    public string? Name { get; set; }
}
