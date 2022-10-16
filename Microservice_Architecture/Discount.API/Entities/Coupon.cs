using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Discount.API.Entities
{
    public class Coupon
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
    }
}
