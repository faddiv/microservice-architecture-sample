using FluentValidation;
using Ordering.API.Application.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FluentValidation
{
    public static class RuleBuilderExtensions
    {
        public static IRuleBuilderOptions<T, string> ExistingOrderAsync<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.MustAsync(async (T model, string id, ValidationContext<T> context, CancellationToken token) =>
            {
                var repository = context.GetServiceProvider().GetRequiredService<IOrderRepository>();
                var order = await repository.GetOrderById(id);
                return order != null;
            });
        }
    }
}
