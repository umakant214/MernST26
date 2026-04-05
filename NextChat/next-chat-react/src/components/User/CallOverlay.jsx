import React, { useEffect, useRef } from 'react';

const CallOverlay = ({ call, onAccept, onDecline, onEnd }) => {
    const localVideoRef = useRef(null);
    const mediaStreamRef = useRef(null);

    useEffect(() => {
        if (call && call.callType === 'video' && (call.status === 'connected' || call.status === 'outgoing')) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    mediaStreamRef.current = stream;
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                }).catch(err => console.log('Media error', err));
        }

        return () => {
             if (mediaStreamRef.current) {
                 mediaStreamRef.current.getTracks().forEach(track => track.stop());
             }
        };
    }, [call]);

    if (!call) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
        }}>
            <div style={{
                width: '360px', height: '540px', background: 'var(--nc-gray-900)', borderRadius: '32px',
                padding: '30px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                {/* Video Background if Video Call */}
                {call.callType === 'video' && (call.status === 'connected' || call.status === 'outgoing') && (
                    <video 
                        ref={localVideoRef} 
                        autoPlay playsInline muted 
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                            objectFit: 'cover', zIndex: 0, opacity: call.status === 'connected' ? 1 : 0.5
                        }} 
                    />
                )}

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                        <div className="mb-4 position-relative">
                            <div className="avatar d-flex align-items-center justify-content-center text-white" 
                                 style={{ width: '110px', height: '110px', fontSize: '36px', background: 'var(--nc-primary)', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                                {call.peerName?.[0]?.toUpperCase()}
                            </div>
                            {(call.status === 'incoming' || call.status === 'outgoing') && (
                                <div className="pulse-ring"></div>
                            )}
                        </div>
                        
                        <h2 className="fw-bold mb-1" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{call.peerName}</h2>
                        <p className="text-white mb-4" style={{opacity: 0.8, textShadow: '0 1px 2px rgba(0,0,0,0.5)', fontSize: '15px'}}>
                            {call.status === 'incoming' ? `Incoming ${call.callType} call...` : 
                             call.status === 'outgoing' ? `Ringing...` : 
                             `${call.duration || '00:00'}`}
                        </p>
                    </div>

                    <div className="d-flex justify-content-center gap-4 pb-3">
                        {call.status === 'incoming' && (
                            <button className="btn d-flex align-items-center justify-content-center rounded-circle" 
                                    style={{ background: '#10b981', color: 'white', width: '64px', height: '64px', border: 'none', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                                    onClick={onAccept}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                            </button>
                        )}
                        <button className="btn d-flex align-items-center justify-content-center rounded-circle" 
                                style={{ background: '#ef4444', color: 'white', width: '64px', height: '64px', border: 'none', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
                                onClick={call.status === 'incoming' ? onDecline : onEnd}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.42 19.42 0 01-3.33-2.67m-2.67-3.33A19.79 19.79 0 011.93 5.06 2 2 0 014.11 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91m14.82 8.91l-21-21" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .pulse-ring {
                    content: '';
                    position: absolute;
                    top: -15px; left: -15px; right: -15px; bottom: -15px;
                    border: 3px solid rgba(255,255,255,0.5);
                    border-radius: 50%;
                    animation: pulse-ring 2s infinite cubic-bezier(0.25, 1, 0.5, 1);
                    pointer-events: none;
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default CallOverlay;
