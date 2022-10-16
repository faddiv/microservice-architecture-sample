using System;
using System.Linq.Expressions;
using EventBus.Messages.Events;
using Ordering.API.Application.Features.CheckoutOrder;
using Ordering.API.Application.Features.GetOrderList;
using Ordering.API.Application.Features.UpdateOrder;
using Ordering.API.Domain.Entities;
using Ordering.API.Mappers;

namespace Ordering.API.Mappers
{
    public partial class OrderMapper : IOrderMapper
    {
        public Expression<Func<Order, OrderModel>> ProjectToDto => p1 => new OrderModel()
        {
            Id = p1.Id,
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
            PaymentMethod = p1.PaymentMethod,
            CreatedBy = p1.CreatedBy,
            CreatedDate = p1.CreatedDate,
            LastModifiedBy = p1.LastModifiedBy,
            LastModifiedDate = p1.LastModifiedDate
        };
        public Order MapToOrder(CheckoutOrderCommand p2)
        {
            return p2 == null ? null : new Order()
            {
                UserName = p2.UserName,
                TotalPrice = p2.TotalPrice,
                FirstName = p2.FirstName,
                LastName = p2.LastName,
                EmailAddress = p2.EmailAddress,
                AddressLine = p2.AddressLine,
                Country = p2.Country,
                State = p2.State,
                ZipCode = p2.ZipCode,
                CardName = p2.CardName,
                CardNumber = p2.CardNumber,
                Expiration = p2.Expiration,
                CVV = p2.CVV,
                PaymentMethod = p2.PaymentMethod
            };
        }
        public Order CopyToOrder(UpdateOrderCommand p3, Order p4)
        {
            if (p3 == null)
            {
                return null;
            }
            Order result = p4 ?? new Order();
            
            result.UserName = p3.UserName;
            result.TotalPrice = p3.TotalPrice;
            result.FirstName = p3.FirstName;
            result.LastName = p3.LastName;
            result.EmailAddress = p3.EmailAddress;
            result.AddressLine = p3.AddressLine;
            result.Country = p3.Country;
            result.State = p3.State;
            result.ZipCode = p3.ZipCode;
            result.CardName = p3.CardName;
            result.CardNumber = p3.CardNumber;
            result.Expiration = p3.Expiration;
            result.CVV = p3.CVV;
            result.PaymentMethod = p3.PaymentMethod;
            return result;
            
        }
        public CheckoutOrderCommand MapToCheckoutOrderCommand(BasketCheckoutEvent p5)
        {
            return p5 == null ? null : new CheckoutOrderCommand()
            {
                UserName = p5.UserName,
                TotalPrice = p5.TotalPrice,
                FirstName = p5.FirstName,
                LastName = p5.LastName,
                EmailAddress = p5.EmailAddress,
                AddressLine = p5.AddressLine,
                Country = p5.Country,
                State = p5.State,
                ZipCode = p5.ZipCode,
                CardName = p5.CardName,
                CardNumber = p5.CardNumber,
                Expiration = p5.Expiration,
                CVV = p5.CVV,
                PaymentMethod = p5.PaymentMethod
            };
        }
    }
}