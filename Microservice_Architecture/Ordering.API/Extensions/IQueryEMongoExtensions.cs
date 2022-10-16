using MongoDB.Driver;

namespace Ordering.API.Extensions
{
    public static class IQueryEMongoExtensions
    {
        public static Task<List<T>> ToListAsync<T>(this IQueryable<T> values, CancellationToken cancellationToken)
        {
            if(values is IAsyncCursorSource<T> sy)
            {
                return sy.ToListAsync(cancellationToken);
            }
            throw new NotImplementedException();
        }
    }
}
