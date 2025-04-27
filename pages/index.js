import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_live_51RIN7LK1hiX1qupe9dcdv8Jb0T3QBfuqCPOaaUm34jpx0s1HmULElX4dyiqWKTUd9CIwnHl7pbG2ljrSQDU8xZbZ00EGyHk2uy');
  }
  return stripePromise;
};

export default function Home() {
  const handleClick = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/checkout_sessions', { method: 'POST' });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button style={{ padding: '16px 32px', fontSize: '18px', backgroundColor: '#29ABF4', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
}
