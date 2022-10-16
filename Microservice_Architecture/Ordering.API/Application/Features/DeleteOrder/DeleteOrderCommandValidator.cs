using FluentValidation;

namespace Ordering.API.Application.Features.DeleteOrder
{
    public class DeleteOrderCommandValidator : AbstractValidator<DeleteOrderCommand>
    {
        public DeleteOrderCommandValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty()
                .ExistingOrderAsync();
        }
    }
}
