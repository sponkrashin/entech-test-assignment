namespace FarmWebAppData.Implementations;

using FarmWebAppExceptions;

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
        var animalExists = this.animalsList.Any(x => x.Name == name);
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
        if (this.animalsList.All(x => x.Name != name))
        {
            throw new EntityNotFoundException($"Animal with name {name} is not found");
        }

        this.animalsList.RemoveAll(x => x.Name == name);

        return Task.CompletedTask;
    }
}
