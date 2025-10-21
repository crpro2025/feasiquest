// ===================================
// STRIPE BILLING CONFIGURATION
// ===================================

// Stripe Configuration
const STRIPE_CONFIG = {
    // Replace with your actual Stripe publishable key
    publicKey: 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz', // TODO: Replace with actual key
    
    // API endpoint for backend
    apiEndpoint: '/api/billing', // TODO: Set up backend API
    
    // Price IDs from Stripe Dashboard
    priceIds: {
        sites: {
            professional: {
                monthly: 'price_sites_pro_monthly', // TODO: Create in Stripe
                annual: 'price_sites_pro_annual'    // TODO: Create in Stripe
            },
            premium: {
                monthly: 'price_sites_premium_monthly', // TODO: Create in Stripe
                annual: 'price_sites_premium_annual'    // TODO: Create in Stripe
            }
        },
        sponsors: {
            starter: {
                monthly: 'price_sponsors_starter_monthly', // TODO: Create in Stripe
                annual: 'price_sponsors_starter_annual'    // TODO: Create in Stripe
            },
            professional: {
                monthly: 'price_sponsors_pro_monthly', // TODO: Create in Stripe
                annual: 'price_sponsors_pro_annual'    // TODO: Create in Stripe
            },
            enterprise: {
                monthly: 'price_sponsors_ent_monthly', // TODO: Create in Stripe
                annual: 'price_sponsors_ent_annual'    // TODO: Create in Stripe
            }
        }
    },
    
    // Pricing details (for display)
    pricing: {
        sites: {
            free: { monthly: 0, annual: 0 },
            professional: { monthly: 299, annual: 239 },
            premium: { monthly: 599, annual: 479 }
        },
        sponsors: {
            starter: { monthly: 999, annual: 799 },
            professional: { monthly: 2499, annual: 1999 },
            enterprise: { monthly: 4999, annual: 3999 }
        }
    },
    
    // Trial configuration
    trial: {
        enabled: true,
        days: 30,
        requireCard: false
    }
};

// Initialize Stripe
let stripe = null;

function initializeStripe() {
    if (typeof Stripe === 'undefined') {
        console.error('Stripe.js not loaded');
        return null;
    }
    
    if (!stripe) {
        stripe = Stripe(STRIPE_CONFIG.publicKey);
    }
    
    return stripe;
}

// Get price ID based on user type, tier, and billing period
function getPriceId(userType, tier, billingPeriod = 'monthly') {
    try {
        return STRIPE_CONFIG.priceIds[userType][tier][billingPeriod];
    } catch (error) {
        console.error('Invalid price configuration:', { userType, tier, billingPeriod });
        return null;
    }
}

// Get pricing amount
function getPricing(userType, tier, billingPeriod = 'monthly') {
    try {
        return STRIPE_CONFIG.pricing[userType][tier][billingPeriod];
    } catch (error) {
        console.error('Invalid pricing configuration:', { userType, tier, billingPeriod });
        return null;
    }
}

// Calculate savings for annual billing
function calculateSavings(userType, tier) {
    const monthly = getPricing(userType, tier, 'monthly');
    const annual = getPricing(userType, tier, 'annual');
    
    if (!monthly || !annual) return 0;
    
    const monthlyTotal = monthly * 12;
    const annualTotal = annual * 12;
    const savings = monthlyTotal - annualTotal;
    
    return savings;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Create checkout session
async function createCheckoutSession(priceId, userEmail, userType, tier) {
    try {
        const response = await fetch(`${STRIPE_CONFIG.apiEndpoint}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priceId: priceId,
                email: userEmail,
                userType: userType,
                tier: tier,
                trialDays: STRIPE_CONFIG.trial.enabled ? STRIPE_CONFIG.trial.days : 0
            })
        });
        
        const session = await response.json();
        return session;
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
}

// Redirect to Stripe Checkout
async function redirectToCheckout(priceId, userEmail, userType, tier) {
    const stripeInstance = initializeStripe();
    
    if (!stripeInstance) {
        alert('Payment system not initialized. Please refresh the page.');
        return;
    }
    
    try {
        // Create checkout session on backend
        const session = await createCheckoutSession(priceId, userEmail, userType, tier);
        
        // Redirect to Stripe Checkout
        const { error } = await stripeInstance.redirectToCheckout({
            sessionId: session.id
        });
        
        if (error) {
            console.error('Stripe checkout error:', error);
            alert('Error redirecting to checkout. Please try again.');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error starting checkout. Please try again.');
    }
}

// Create customer portal session
async function createPortalSession(customerId) {
    try {
        const response = await fetch(`${STRIPE_CONFIG.apiEndpoint}/create-portal-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerId: customerId
            })
        });
        
        const session = await response.json();
        return session;
    } catch (error) {
        console.error('Error creating portal session:', error);
        throw error;
    }
}

// Redirect to customer portal
async function redirectToPortal(customerId) {
    try {
        const session = await createPortalSession(customerId);
        window.location.href = session.url;
    } catch (error) {
        console.error('Portal error:', error);
        alert('Error opening billing portal. Please try again.');
    }
}

// Check subscription status
async function checkSubscriptionStatus(customerId) {
    try {
        const response = await fetch(`${STRIPE_CONFIG.apiEndpoint}/subscription-status?customerId=${customerId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking subscription:', error);
        return null;
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STRIPE_CONFIG,
        initializeStripe,
        getPriceId,
        getPricing,
        calculateSavings,
        formatCurrency,
        createCheckoutSession,
        redirectToCheckout,
        createPortalSession,
        redirectToPortal,
        checkSubscriptionStatus
    };
}