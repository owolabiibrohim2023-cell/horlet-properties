import React from "react";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Buying land in Ogun State used to make me nervous because of conflicting surveys. Working with Horlet Properties gave me complete peace of mind. Their office at Surveyors House verified every coordinate on my 2 plots in Kobape within 48 hours.",
    name: "Dr. Femi Ogundipe",
    role: "Medical Consultant (Purchased Land in Kobape)",
    initials: "FO",
    stars: 5,
  },
  {
    quote: "I acquired a 5-bedroom duplex in Ibara GRA while living in Manchester, UK. Horlet Properties coordinated the inspection video, legal documentation, and title transfer with extreme professionalism. No hidden fees whatsoever.",
    name: "Mrs. Adesola Williams-Adewale",
    role: "Diaspora Real Estate Investor (UK)",
    initials: "AW",
    stars: 5,
  },
  {
    quote: "Their team helped our logistics firm secure our 3-storey office along Oke-Ilewo. From lease negotiation to prompt landlord agreement handover, Horlet Properties proved why they are the top agency in Abeokuta.",
    name: "Engr. Kayode Balogun",
    role: "MD, Apex Logistics Nigeria",
    initials: "KB",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section-earth">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <MessageSquareQuote size={14} />
            <span>Client Testimonials</span>
          </span>
          <h2 className="section-title">
            Trusted by Homeowners &amp; Investors Across Nigeria &amp; Abroad
          </h2>
          <p className="section-subtitle">
            See how Horlet Properties has guided families, business owners, and diaspora clients into secure property ownership in Abeokuta, Ogun State.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <div>
                <div className="testimonial-stars">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  "{item.quote}"
                </p>
              </div>

              <div className="testimonial-author">
                <div className="author-avatar">
                  {item.initials}
                </div>
                <div className="author-info">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
