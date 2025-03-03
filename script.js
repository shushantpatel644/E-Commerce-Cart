function StarRating({ rating, onRate }) {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    onClick={() => onRate(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

function App() {
    const [cart, setCart] = React.useState([]);
    const [showCart, setShowCart] = React.useState(false);
    const [showPayment, setShowPayment] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [feedbackList, setFeedbackList] = React.useState([]);

    const products = [
        { id: 1, name: 'Black T-shirt', price: 49.99, image: 'Images/BlackTshirt.jpg', rating: 4 },
        { id: 2, name: 'Roadster Women Jean', price: 79.99, image: 'Images/RoadsterJeans.jpg', rating: 5 },
        { id: 3, name: 'Girls Solid Long Sleeve Slim Fit Top', price: 19.99, image: 'Images/LongSleev.webp', rating: 5 },
        { id: 4, name: 'Formal Shirt', price: 29.99, image: 'Images/FormalShirt.jpg', rating: 3 },
        { id: 5, name: 'Check Shirt', price: 29.99, image: 'Images/CheckShirt.jpg', rating: 2 },
        { id: 6, name: '3 Combo Shirt', price: 29.99, image: 'Images/ComboShirts.jpg', rating: 2 },
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const handleFeedbackSubmit = () => {
        if (feedback.trim()) {
            setFeedbackList([...feedbackList, { text: feedback, date: new Date().toLocaleDateString() }]);
            setFeedback('');
        }
    };

    return (
        <div className="container">
            <header>
                <h1>My Store</h1>
                <button onClick={() => setShowCart(!showCart)}>
                    🛒 Cart ({cart.length})
                </button>
            </header>

            <div className={`cart-sidebar ${showCart ? 'cart-open' : ''}`}>
                <button className="close-cart" onClick={() => setShowCart(false)}>✖</button>
                <h2>🛍️ Your Cart</h2>
                {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div>
                            <h3>{item.name}</h3>
                            <p>${item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                ))}
                <div className="cart-total">
                    <h3>Total: ${totalAmount.toFixed(2)}</h3>
                    <button onClick={() => setShowPayment(true)}>💳 Checkout</button>
                </div>
            </div>

            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="image-container">
                            <img src={product.image} alt={product.name} className="product-image" />
                        </div>
                        <h2>{product.name}</h2>
                        <StarRating 
                            rating={product.rating} 
                            onRate={(newRating) => {
                                // Update the product rating here if needed
                                // For now, this just logs the new rating
                                console.log(`New rating for ${product.name}: ${newRating}`);
                            }} 
                        />
                        <div className="rating">
                            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                        </div>
                        <p className="price">${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <div className={`payment-form ${showPayment ? 'show-payment' : ''}`}>
                <button className="close-payment" onClick={() => setShowPayment(false)}>✖</button>
                <h2>💳 Payment Details</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="4242 4242 4242 4242" required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                        <label>CVC</label>
                        <input type="text" placeholder="123" required />
                    </div>
                    <button type="submit">Pay ${totalAmount.toFixed(2)}</button>
                </form>
            </div>

            <div className="feedback-section">
                <h2>💬 Customer Feedback</h2>
                <p>We value your opinion!</p>
                <textarea 
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts about our products and service..."
                />
                <button onClick={handleFeedbackSubmit}>
                    Submit Feedback
                </button>

                <div className="feedback-display">
                    <h3>Customer Reviews ({feedbackList.length})</h3>
                    {feedbackList.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-header">
                                <span className="user-icon">👤</span>
                                <div className="review-meta">
                                    <p className="review-date">{review.date}</p>
                                </div>
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));