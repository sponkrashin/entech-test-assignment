namespace FarmWebApp.Data.Implementations;

using FarmWebApp.Exceptions;

public class AnimalsMemoryStorage : IAnimalsStorage
{
    private readonly List<Animal> animalsList =
    [
        new Animal
        {
            Name = "Leo"
        },

        new Animal
        {
            Name = "Squish"
        },

        new Animal
        {
            Name = "Baron"
        }
    ];

    public Task<IReadOnlyCollection<Animal>> GetAll(CancellationToken cancellationToken)
    {
        var animals = this.animalsList.ToArray();
        return Task.FromResult<IReadOnlyCollection<Animal>>(animals);
    }

    public Task<Animal> Add(string name, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Animal name should not be empty");
        }

        var animalExists = this.animalsList.Any(x => string.Equals(x.Name, name, StringComparison.CurrentCultureIgnoreCase));
        if (animalExists)
        {
            throw new DuplicateEntityException($"Animal with name {name} already exists");
        }

        var animal = new Animal
        {
            Name = name
        };

        this.animalsList.Add(animal);

        return Task.FromResult(animal);
    }

    public Task Remove(string name, CancellationToken cancellationToken)
    {
        if (this.animalsList.All(x => !string.Equals(x.Name, name, StringComparison.CurrentCultureIgnoreCase)))
        {
            throw new EntityNotFoundException($"Animal with name {name} is not found");
        }

        this.animalsList.RemoveAll(x => x.Name == name);

        return Task.CompletedTask;
    }
}
