import React, { useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  FileCheck,
  Send,
  Eye,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { formatNaira } from "../utils/formatters";

export default function PropertyCard({ property, onSelectForEnquiry, onViewDetails }) {
  const [imageError, setImageError] = useState(false);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "For Sale":
        return "badge-sale";
      case "For Rent":
        return "badge-rent";
      case "Sold":
        return "badge-sold";
      default:
        return "badge-sale";
    }
  };

  const displayImage = imageError
    ? property.fallbackSvg || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    : property.image || property.fallbackSvg;

  return (
    <article className="property-card">
      <div className="card-image-box">
        <img
          src={displayImage}
          alt={property.title}
          className="card-image"
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Status Pill */}
        <span className={`card-status-badge ${getStatusBadgeClass(property.status)}`}>
          {property.status}
        </span>

        {/* Property Type Tag */}
        {property.propertyType && (
          <span className="card-type-tag">
            {property.propertyType}
          </span>
        )}

        {/* Featured Ribbon if applicable */}
        {property.featured && (
          <span className="card-featured-ribbon">
            <Sparkles size={12} />
            <span>Featured Listing</span>
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="card-price-row">
          <div className="card-price">
            {formatNaira(property.priceFormatted || property.price)}
          </div>
          <span className="card-id-pill">{property.id}</span>
        </div>

        <h3 className="card-title" title={property.title}>
          {property.title}
        </h3>

        <div className="card-location">
          <MapPin size={14} color="#0f5132" style={{ flexShrink: 0 }} />
          <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            {property.location}
          </span>
        </div>

        {/* Key Specs */}
        <div className="card-specs">
          {property.bedrooms !== null && property.bedrooms !== undefined && (
            <div className="card-spec-item" title={`${property.bedrooms} Bedrooms`}>
              <Bed size={15} color="#475569" />
              <span><strong>{property.bedrooms}</strong> Beds</span>
            </div>
          )}

          {property.bathrooms !== null && property.bathrooms !== undefined && (
            <div className="card-spec-item" title={`${property.bathrooms} Bathrooms`}>
              <Bath size={15} color="#475569" />
              <span><strong>{property.bathrooms}</strong> Baths</span>
            </div>
          )}

          {property.landSize && (
            <div className="card-spec-item" title={`Land Area: ${property.landSize}`}>
              <Maximize2 size={15} color="#475569" />
              <span>{property.landSize}</span>
            </div>
          )}

          {property.titleDoc && !property.bedrooms && (
            <div className="card-spec-item" title={`Title: ${property.titleDoc}`}>
              <FileCheck size={15} color="#166534" />
              <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {property.titleDoc}
              </span>
            </div>
          )}
        </div>

        {/* Short Description */}
        <p className="card-description">
          {property.description}
        </p>

        {/* Action Buttons */}
        <div className="card-actions">
          <button
            onClick={() => onSelectForEnquiry(property)}
            className="btn-enquire-card"
            title={`Enquire about ${property.title}`}
          >
            <Send size={15} />
            <span>Order / Enquire</span>
          </button>

          <button
            onClick={() => onViewDetails(property)}
            className="btn-view-details"
            title="View Full Specifications"
          >
            <Eye size={15} />
            <span style={{ marginLeft: "0.25rem" }}>Details</span>
          </button>
        </div>
      </div>
    </article>
  );
}
