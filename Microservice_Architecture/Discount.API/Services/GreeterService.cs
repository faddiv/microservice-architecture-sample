using Discount.API.Mappers;
using Discount.API.Repositories;
using Discount.Grpc;
using Grpc.Core;

namespace Discount.API.Services
{
    public class GreeterService : DiscountGrpc.DiscountGrpcBase
    {
        private readonly ILogger<GreeterService> _logger;
        private readonly ICouponRepository _couponRepository;
        private readonly ICouponMapper _mapper;

        public GreeterService(
            ILogger<GreeterService> logger,
            ICouponRepository couponRepository,
            ICouponMapper mapper)
        {
            _logger = logger;
            _couponRepository = couponRepository;
            _mapper = mapper;
        }

        public override async Task<CouponMessage> GetDiscount(ProductNameRequest request, ServerCallContext context)
        {
            return _mapper.MapTo(await _couponRepository.GetCouponByProductName(request.ProductName));
        }

        public override async Task<CouponMessage> CreateCoupon(CouponMessage request, ServerCallContext context)
        {
            var coupon = _mapper.MapTo(request);
            await _couponRepository.CreateCoupon(coupon);
            return _mapper.MapTo(coupon);
        }

        public override async Task<StatusMessage> UpdateCoupon(CouponMessage request, ServerCallContext context)
        {
            var coupon = _mapper.MapTo(request);
            var success = await _couponRepository.UpdateCoupon(coupon);
            return new StatusMessage { Success = success };
        }

        public override async Task<StatusMessage> DeleteCoupon(ProductNameRequest request, ServerCallContext context)
        {
            var success = await _couponRepository.DeleteCouponByProductName(request.ProductName);
            return new StatusMessage { Success = success };
        }
    }
}
