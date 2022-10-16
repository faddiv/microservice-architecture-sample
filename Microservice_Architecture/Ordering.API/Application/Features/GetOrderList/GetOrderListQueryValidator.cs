using FluentValidation;

namespace Ordering.API.Application.Features.GetOrderList
{
    public class GetOrderListQueryValidator : AbstractValidator<GetOrderListQuery>
    {
        public GetOrderListQueryValidator()
        {
            RuleFor(e => e.UserName)
                .NotEmpty();
        }
    }
}
