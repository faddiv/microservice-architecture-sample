namespace Ordering.API.Domain.Common
{
    public interface IEntity
    {
        string Id { get; set; }
        string CreatedBy { get; set; }
        DateTime CreatedDate { get; set; }
        string LastModifiedBy { get; set; }
        DateTime? LastModifiedDate { get; set; }
    }
}
