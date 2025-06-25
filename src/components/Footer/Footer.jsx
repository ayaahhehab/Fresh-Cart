import React from 'react';
import Style from './Footer.module.css';

export default function Footer() {
  return <>
  <footer className="bg-light py-5 mt-5" style={{ minHeight: "350px", display:'flex', alignItems:'center' }}>
  <div className="container">
    <div className="row align-items-center ">
      {/* Section 1: App Promo */}
      <div className="col-md-8">
        <h6 className="fw-bold">Get the FreshCart app</h6>
        <p className="text-muted small mb-2">We will send you a link, open it on your phone to download the app.</p>
        <div className="d-flex">
          <input type="email" className="form-control me-2 mt-5" placeholder="Email..." style={{ maxWidth: "300px" }} />
          <button className="btn btn-success mt-5">Share App Link</button>
        </div>
      </div>

      {/* Section 2: App Store Icons */}
      <div className="col-md-4 text-md-end mt-4 mt-md-0">
        <p className="mb-2 small text-muted">Get deliveries with FreshCart</p>
        <i className="fab fa-apple fa-2x me-3 text-dark"></i>
        <i className="fab fa-google-play fa-2x text-dark"></i>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="row mt-5 border-top pt-3 ">
      <div className="col-md-6">
        <span className="text-muted small">Payment Partners:</span>
        <i className="fab fa-cc-visa fa-lg ms-3 text-primary"></i>
        <i className="fab fa-cc-mastercard fa-lg ms-3 text-danger"></i>
        <i className="fab fa-cc-paypal fa-lg ms-3 text-info"></i>
      </div>
    </div>
  </div>
</footer>

  </>
    
}
