export default function AuthFunction(){
    const token=localStorage.getItem('TokenValue')

    return token!==null;
}