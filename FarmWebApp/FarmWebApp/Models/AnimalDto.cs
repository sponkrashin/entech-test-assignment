namespace FarmWebApp.Models;

// It doesn't really make sense to use DTO in such simple project,
// but it is a common practice to not return entity types from the controller
public class AnimalDto
{
    public string Name { get; set; } = string.Empty;
}
