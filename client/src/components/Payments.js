import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
	onToken = token => {
		this.props.handleStripeToken(token);
	};

	render() {
		const { stripeKey } = this.props;
		return (
			<StripeCheckout
				amount={500}
				token={this.onToken}
				stripeKey={stripeKey}
				name="Emaily"
				description="$5 for 5 credits"
			>
				<button className="waves-effect waves-light btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default Payments;
