import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom"; // Ensure Link is imported
import { MoveRight, Truck, Package, Send } from "lucide-react";

const OrderSummary = () => {
	const { total, subtotal } = useCartStore();
	const [shippingMethod, setShippingMethod] = useState("courier");

	const savings = subtotal - total;
	const vat = subtotal * 0.15;
	const totalWithVAT = subtotal + vat;
	const courierCost = 200; // Courier cost in Rands
	const totalWithCourier = totalWithVAT + courierCost;

	const formattedSubtotal = subtotal.toFixed(2);
	const formattedVAT = vat.toFixed(2);
	const formattedTotalWithVAT = totalWithVAT.toFixed(2);
	const formattedTotalWithCourier = totalWithCourier.toFixed(2);
	const formattedSavings = savings > 0 ? savings.toFixed(2) : "0.00";

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					{/* Price Details */}
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>R{formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-R{formattedSavings}</dd>
						</dl>
					)}

					{/* VAT */}
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>VAT (15%)</dt>
						<dd className='text-base font-medium text-emerald-400'>+R{formattedVAT}</dd>
					</dl>

					{/* Shipping Method Section */}
					<div className='border-t border-gray-600 pt-3'>
						<p className='text-base font-bold text-white mb-2'>Shipping Method</p>
						
						{/* Shipping Options */}
						<div className='flex flex-col gap-3'>
							{/* Courier Option */}
							<label className='flex flex-col gap-2 cursor-pointer'>
								<input
									type='radio'
									name='shipping'
									value='courier'
									checked={shippingMethod === "courier"}
									onChange={() => setShippingMethod("courier")}
									className='hidden'
								/>
								<div className={`flex items-center gap-2 p-2 rounded-lg border ${shippingMethod === "courier" ? "border-emerald-500 bg-emerald-700/20" : "border-gray-600"} w-full`}>
									<Truck size={20} className='text-emerald-400' />
									<span className='text-white text-sm'>Courier</span>
								</div>
								{shippingMethod === "courier" && (
									<div className='text-xs text-gray-400 pl-10'>
										<p>Courier will cost R200 incl. VAT and typically takes 3-5 days to deliver on completion of order.</p>
									</div>
								)}
							</label>

							{/* Pick Up Order Option */}
							<label className='flex flex-col gap-2 cursor-pointer'>
								<input
									type='radio'
									name='shipping'
									value='pickup'
									checked={shippingMethod === "pickup"}
									onChange={() => setShippingMethod("pickup")}
									className='hidden'
								/>
								<div className={`flex items-center gap-2 p-2 rounded-lg border ${shippingMethod === "pickup" ? "border-emerald-500 bg-emerald-700/20" : "border-gray-600"} w-full`}>
									<Package size={20} className='text-emerald-400' />
									<span className='text-white text-sm'>Pick Up Order</span>
								</div>
								{shippingMethod === "pickup" && (
									<div className='text-xs text-gray-400 pl-10'>
										<p>Our business address is 21B Blue Street, Isithebe, Mandeni, 4490.</p>
									</div>
								)}
							</label>

							{/* Own Courier Option */}
							<label className='flex flex-col gap-2 cursor-pointer'>
								<input
									type='radio'
									name='shipping'
									value='ownCourier'
									checked={shippingMethod === "ownCourier"}
									onChange={() => setShippingMethod("ownCourier")}
									className='hidden'
								/>
								<div className={`flex items-center gap-2 p-2 rounded-lg border ${shippingMethod === "ownCourier" ? "border-emerald-500 bg-emerald-700/20" : "border-gray-600"} w-full`}>
									<Send size={20} className='text-emerald-400' />
									<span className='text-white text-sm'>Own Courier</span>
								</div>
								{shippingMethod === "ownCourier" && (
									<div className='text-xs text-gray-400 pl-10'>
										<p>An email will be sent on completion of order along with the business address: 21B Blue Street, Isithebe, Mandeni, 4490.</p>
									</div>
								)}
							</label>
						</div>
					</div>

					{/* Total including VAT and Courier Cost */}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2 mt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>
							{shippingMethod === "courier" ? `R${formattedTotalWithCourier}` : `R${formattedTotalWithVAT}`}
						</dd>
					</dl>
				</div>

				{/* Proceed to Checkout Button */}
				<Link to="/proceed-to-checkout">
					<motion.button
						className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-m font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Proceed to Checkout
					</motion.button>
				</Link>

				{/* Continue Shopping Link */}
				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
