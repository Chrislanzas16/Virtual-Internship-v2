import { getFunctions, httpsCallable } from "firebase/functions";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, onSnapshot, DocumentReference } from "firebase/firestore";

export const STRIPE_PRICE_IDS = {
    monthly: "price_1SPskJHP85mQuMNrnCh5oxRz",
    yearly: "price_1SPsjeHP85mQuMNrpK1JBuSG"
}

type CreateCheckoutPayload = {
    price: string;
    success_url?: string;
    cancel_url?:string;
};

export const createStripeCheckout = async (priceId: string, setLoading?: (val: boolean) => void) => {
   const user = auth.currentUser;

   if (!user){
    alert("Please sign in with your email to start a subscription.")
    return;
   }

   try {
    setLoading?.(true)
    const checkoutSessionRef = await addDoc(
        collection(db, "customers", user.uid, "checkout_sessions"),
        {
            price: priceId,
            success_url: window.location.origin + "/success",
            cancel_url: window.location.origin + "/settings",
        }
    );

    const unsub = onSnapshot(checkoutSessionRef, (snap)=> {
        const data = snap.data();
        if (!data) return;

        const { url, error} = data as {url?: string; error?: {message: string}};

        if (error){
            console.error("Stripe checkout error:", error);
            alert (error.message || "There was a problem starting your checkout.")
            unsub();
            return;
        }
        if (url){
            unsub();
            window.location.assign(url)
        }
    });
   } catch (err){
    console.error("Error creating checkout session:", err);
    alert("There was a problem starting your checkout. Please try again.")
    setLoading?.(false)
   }
       
}
