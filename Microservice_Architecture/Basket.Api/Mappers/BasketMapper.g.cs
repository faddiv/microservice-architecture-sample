using Basket.Api.Entites;
using Basket.Api.Mappers;
using EventBus.Messages.Events;

namespace Basket.Api.Mappers
{
    public partial class BasketMapper : IBasketMapper
    {
        public BasketCheckoutEvent MapTo(BasketCheckout p1)
        {
            return p1 == null ? null : new BasketCheckoutEvent()
            {
                UserName = p1.UserName,
                TotalPrice = p1.TotalPrice,
                FirstName = p1.FirstName,
                LastName = p1.LastName,
                EmailAddress = p1.EmailAddress,
                AddressLine = p1.AddressLine,
                Country = p1.Country,
                State = p1.State,
                ZipCode = p1.ZipCode,
                CardName = p1.CardName,
                CardNumber = p1.CardNumber,
                Expiration = p1.Expiration,
                CVV = p1.CVV,
                PaymentMethod = p1.PaymentMethod
            };
        }
    }
}