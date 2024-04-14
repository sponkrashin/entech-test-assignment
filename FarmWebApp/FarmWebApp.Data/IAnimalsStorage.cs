namespace FarmWebApp.Data;

// Async results are not used in the current implementation, but will definitely be used in more real world implementations
public interface IAnimalsStorage
{
    Task<IReadOnlyCollection<Animal>> GetAll(CancellationToken cancellationToken = default);

    Task<Animal> Add(string name, CancellationToken cancellationToken = default);

    Task Remove(string name, CancellationToken cancellationToken = default);
}
