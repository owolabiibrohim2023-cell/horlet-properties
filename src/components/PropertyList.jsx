import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, Home, Sparkles } from "lucide-react";
import PropertyCard from "./PropertyCard";

export default function PropertyList({
  properties,
  onSelectForEnquiry,
  onViewDetails,
  filterState,
  onResetFilters
}) {
  const [selectedStatus, setSelectedStatus] = useState(filterState?.status || "All");
  const [searchQuery, setSearchQuery] = useState(filterState?.keyword || "");
  const [selectedType, setSelectedType] = useState(filterState?.propertyType || "All");
  const [sortBy, setSortBy] = useState("default");

  // Keep state in sync if parent passed new filterState from Hero search
  React.useEffect(() => {
    if (filterState) {
      if (filterState.status) setSelectedStatus(filterState.status);
      if (filterState.keyword !== undefined) setSearchQuery(filterState.keyword);
      if (filterState.propertyType) setSelectedType(filterState.propertyType);
    }
  }, [filterState]);

  // Counts for each status
  const counts = useMemo(() => {
    return {
      all: properties.length,
      forSale: properties.filter((p) => p.status === "For Sale").length,
      forRent: properties.filter((p) => p.status === "For Rent").length,
      sold: properties.filter((p) => p.status === "Sold").length,
    };
  }, [properties]);

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // Status filter
        if (selectedStatus !== "All" && item.status !== selectedStatus) {
          return false;
        }

        // Type filter
        if (selectedType !== "All" && item.propertyType !== selectedType) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = item.title?.toLowerCase().includes(q);
          const locMatch = item.location?.toLowerCase().includes(q);
          const descMatch = item.description?.toLowerCase().includes(q);
          const idMatch = item.id?.toLowerCase().includes(q);
          const typeMatch = item.propertyType?.toLowerCase().includes(q);
          if (!titleMatch && !locMatch && !descMatch && !idMatch && !typeMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === "number" ? a.price : parseFloat(String(a.price).replace(/[^0-9.]/g, "")) || 0;
        const priceB = typeof b.price === "number" ? b.price : parseFloat(String(b.price).replace(/[^0-9.]/g, "")) || 0;

        if (sortBy === "price-asc") {
          return priceA - priceB;
        }
        if (sortBy === "price-desc") {
          return priceB - priceA;
        }
        // default: featured first, then original order
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [properties, selectedStatus, selectedType, searchQuery, sortBy]);

  const handleClear = () => {
    setSelectedStatus("All");
    setSearchQuery("");
    setSelectedType("All");
    setSortBy("default");
    if (onResetFilters) onResetFilters();
  };

  const isFiltered = selectedStatus !== "All" || selectedType !== "All" || searchQuery.trim() !== "" || sortBy !== "default";

  return (
    <section id="properties" className="section section-earth">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Home size={14} />
            <span>Abeokuta Property Portfolio</span>
          </span>
          <h2 className="section-title">
            Featured Real Estate &amp; Lands for Sale or Rent
          </h2>
          <p className="section-subtitle">
            Explore our curated inventory of luxury detached homes, commercial lands, serviced flats, and investment sites in Abeokuta and surrounding Ogun State districts.
          </p>
        </div>

        {/* Filter Control Bar */}
        <div className="properties-filter-bar">
          <div className="filter-row-top">
            {/* Status Tabs */}
            <div className="status-tabs">
              <button
                className={`status-tab ${selectedStatus === "All" ? "active" : ""}`}
                onClick={() => setSelectedStatus("All")}
              >
                All Properties ({counts.all})
              </button>
              <button
                className={`status-tab ${selectedStatus === "For Sale" ? "active" : ""}`}
                onClick={() => setSelectedStatus("For Sale")}
              >
                For Sale ({counts.forSale})
              </button>
              <button
                className={`status-tab ${selectedStatus === "For Rent" ? "active" : ""}`}
                onClick={() => setSelectedStatus("For Rent")}
              >
                For Rent ({counts.forRent})
              </button>
              <button
                className={`status-tab ${selectedStatus === "Sold" ? "active" : ""}`}
                onClick={() => setSelectedStatus("Sold")}
              >
                Sold Records ({counts.sold})
              </button>
            </div>

            <div className="filter-count-label">
              Showing <strong>{filteredProperties.length}</strong> of <strong>{properties.length}</strong> properties
            </div>
          </div>

          <div className="filter-row-bottom">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search by title, location (e.g. Ibara, Oke-Mosan, Ijeja)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-search-input"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Property Types</option>
              <option value="Detached Duplex">Detached Duplex</option>
              <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Apartment / Flat">Apartment / Flat</option>
              <option value="Terrace Apartment">Terrace Apartment</option>
              <option value="Commercial Land">Commercial Land</option>
              <option value="Agricultural Land">Agricultural Farmland</option>
              <option value="Commercial Building">Commercial Building</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="default">Sort by: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Reset Filter Button */}
            {isFiltered && (
              <button onClick={handleClear} className="btn-clear-filters">
                <RotateCcw size={13} style={{ display: "inline", marginRight: "4px" }} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelectForEnquiry={onSelectForEnquiry}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="empty-properties-state">
            <div className="empty-icon-circle">
              <Search size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              No properties matched your criteria
            </h3>
            <p style={{ color: "var(--slate-500)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Try adjusting your search keyword or clearing the filters to view all available listings.
            </p>
            <button onClick={handleClear} className="btn-primary">
              <RotateCcw size={15} />
              <span>Show All Properties</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
