import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { ShieldCheck, Edit2, Trash2, ArrowLeft, Lightbulb, AlertOctagon, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isLightsOn } = useTheme();

  // Local Form states
  const [editingId, setEditingId] = useState(null); // If null, we are in "Create" mode
  const [formData, setFormData] = useState({
    name: '', category: 'LED Bulbs', price: '', description: '',
    svgType: 'bulb', lightColor: '#F6B100', glowColor: 'rgba(246, 177, 0, 0.35)',
    material: '', dimensions: '', lightSource: '', dimmable: 'Yes', wattage: ''
  });
  
  const [successMsg, setSuccessMsg] = useState('');
  
  // Available select options
  const categoryOptions = [
    'LED Bulbs', 'Chandeliers', 'Wall Lights', 'Table Lamps', 'Floor Lamps',
    'Ceiling Lights', 'Pendant Lights', 'Outdoor Lights', 'Smart Lights', 'Decorative Lamps'
  ];

  const svgTypeOptions = [
    { value: 'bulb', label: 'Vintage Filament Bulb' },
    { value: 'chandelier', label: 'Cascading Chandelier' },
    { value: 'wall-light', label: 'Architectural Wall Sconce' },
    { value: 'table-lamp', label: 'Dome Reflector Table Lamp' },
    { value: 'floor-lamp', label: 'Curved Stem Floor Lamp' },
    { value: 'ceiling-light', label: 'Flush Mount Ceiling Disk' },
    { value: 'pendant-light', label: 'Hanging Glass Globe Pendant' },
    { value: 'outdoor-light', label: 'Black Metal Outdoor Lantern' },
    { value: 'smart-light', label: 'Color-Changing Smart Bulb' },
    { value: 'decorative-lamp', label: 'Geometric Faceted Decolamp' }
  ];

  // Redirect if not admin
  if (!currentUser || !isAdmin) {
    return (
      <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-red-500/10 text-red-500 animate-pulse">
          <AlertOctagon size={36} />
        </div>
        <h2 className="text-2xl font-bold font-display text-neutral-900 dark:text-white font-black">Access Denied</h2>
        <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
          The administrative catalog console is protected. Please log in as an administrator to manage showroom fixtures.
        </p>
        <Link
          to="/auth"
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#5C4033] text-white"
        >
          Access Log In
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      svgType: product.svgType,
      lightColor: product.lightColor || '#F6B100',
      glowColor: product.glowColor || 'rgba(246, 177, 0, 0.35)',
      material: product.specs?.['Material'] || '',
      dimensions: product.specs?.['Dimensions'] || '',
      lightSource: product.specs?.['Light Source'] || '',
      dimmable: product.specs?.['Dimmable'] || 'Yes',
      wattage: product.specs?.['Wattage'] || ''
    });
    setSuccessMsg('');
    
    // Scroll form into view on mobile
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      deleteProduct(id);
      setSuccessMsg(`Fixture "${name}" successfully deleted.`);
      setTimeout(() => setSuccessMsg(''), 4000);
      if (editingId === id) handleCancelEdit();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '', category: 'LED Bulbs', price: '', description: '',
      svgType: 'bulb', lightColor: '#F6B100', glowColor: 'rgba(246, 177, 0, 0.35)',
      material: '', dimensions: '', lightSource: '', dimmable: 'Yes', wattage: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare specs mapping
    const specs = {
      "Material": formData.material || 'Standard Metal',
      "Dimensions": formData.dimensions || 'N/A',
      "Light Source": formData.lightSource || 'Integrated LED',
      "Dimmable": formData.dimmable,
      "Wattage": formData.wattage || '8W'
    };

    // Derived glow templates based on custom choice
    let glowSpread = '90px';
    if (formData.svgType === 'chandelier') glowSpread = '180px';
    if (formData.svgType === 'ceiling-light') glowSpread = '140px';

    const productPayload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      description: formData.description,
      svgType: formData.svgType,
      lightColor: formData.lightColor,
      glowColor: formData.glowColor,
      glowSpread,
      specs
    };

    if (editingId) {
      updateProduct(editingId, productPayload);
      setSuccessMsg(`"${formData.name}" successfully updated.`);
      handleCancelEdit();
    } else {
      addProduct(productPayload);
      setSuccessMsg(`"${formData.name}" successfully added to Luma catalog.`);
      handleCancelEdit();
    }

    setTimeout(() => setSuccessMsg(''), 4500);
  };

  return (
    <div className="w-full pt-28 pb-16 flex flex-col space-y-8">
      {/* Header */}
      <ScrollReveal className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white flex items-center justify-center sm:justify-start space-x-2">
            <ShieldCheck className="text-amber-500" size={32} />
            <span>Admin Console</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Control the e-commerce database, add custom fixtures, and edit prices.
          </p>
        </div>
        <Link 
          to="/showroom"
          className="text-xs font-bold text-neutral-500 hover:text-amber-500 transition-colors flex items-center space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Exit Console</span>
        </Link>
      </ScrollReveal>

      {/* Message alerts */}
      {successMsg && (
        <ScrollReveal className="p-3 bg-green-500/15 border border-green-500/20 text-green-500 text-xs font-bold rounded-xl flex items-center space-x-2 justify-center">
          <Check size={14} strokeWidth={3} />
          <span>{successMsg}</span>
        </ScrollReveal>
      )}

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form: Add/Edit Product */}
        <ScrollReveal className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="glass border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col space-y-4 shadow-lg">
            <h3 className="font-extrabold font-display text-sm tracking-wide text-neutral-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-3">
              {editingId ? 'Modify Showroom Fixture' : 'Deploy New Fixture'}
            </h3>

            {/* Core Fields */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Fixture Title</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                >
                  {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Price (USD)</label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Description</label>
              <textarea
                name="description"
                required
                rows={2}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
              />
            </div>

            {/* Visual configuration */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Vector SVG Layout</label>
              <select
                name="svgType"
                value={formData.svgType}
                onChange={handleInputChange}
                className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
              >
                {svgTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">Light Emission Color</label>
                <input
                  type="text"
                  name="lightColor"
                  value={formData.lightColor}
                  onChange={handleInputChange}
                  placeholder="#F6B100"
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white font-mono"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">CSS Glow Value</label>
                <input
                  type="text"
                  name="glowColor"
                  value={formData.glowColor}
                  onChange={handleInputChange}
                  placeholder="rgba(246,177,0,0.35)"
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white font-mono"
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="border-t border-black/5 dark:border-white/5 pt-3 space-y-3">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide block">Fixture Specs</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] uppercase tracking-wide font-bold text-neutral-400">Material</label>
                  <input
                    type="text"
                    name="material"
                    placeholder="travertine, brass..."
                    value={formData.material}
                    onChange={handleInputChange}
                    className="px-3 py-1.5 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] uppercase tracking-wide font-bold text-neutral-400">Dimensions</label>
                  <input
                    type="text"
                    name="dimensions"
                    placeholder="Dia 30cm x H 40cm"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    className="px-3 py-1.5 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] uppercase tracking-wide font-bold text-neutral-400">Light Source</label>
                  <input
                    type="text"
                    name="lightSource"
                    placeholder="E27, Integrated..."
                    value={formData.lightSource}
                    onChange={handleInputChange}
                    className="px-3 py-1.5 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] uppercase tracking-wide font-bold text-neutral-400">Wattage</label>
                  <input
                    type="text"
                    name="wattage"
                    placeholder="6W, 12W..."
                    value={formData.wattage}
                    onChange={handleInputChange}
                    className="px-3 py-1.5 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl font-bold bg-neutral-800 text-white dark:bg-amber-500 dark:text-neutral-950 text-xs tracking-wider cursor-pointer hover:scale-105 transition-transform"
              >
                {editingId ? 'Save Changes' : 'Publish Product'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-xl font-bold bg-neutral-500/10 hover:bg-neutral-500/20 text-neutral-600 dark:text-neutral-300 text-xs cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </ScrollReveal>

        {/* Right Table: Database list */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <ScrollReveal className="glass border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden p-1 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/5 text-[9px] uppercase tracking-wider text-neutral-400 font-bold bg-neutral-500/5">
                    <th className="px-4 py-3">Fixture</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 text-right">Database Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr 
                      key={p.id} 
                      className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-neutral-500/5 transition-colors"
                    >
                      <td className="px-4 py-4 flex items-center space-x-2">
                        <span className="p-1 rounded bg-neutral-500/5 shrink-0">
                          <Lightbulb size={16} style={{ color: isLightsOn ? p.lightColor : '#8b5e3c' }} />
                        </span>
                        <div>
                          <span className="font-bold text-neutral-800 dark:text-white block">{p.name}</span>
                          <span className="text-[9px] text-neutral-400 font-mono">ID: {p.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-neutral-600 dark:text-neutral-300">
                        {p.category}
                      </td>
                      <td className="px-4 py-4 font-black text-neutral-900 dark:text-amber-400">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 rounded bg-neutral-500/5 hover:bg-amber-500/20 text-neutral-500 hover:text-amber-500 transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id, p.name)}
                            className="p-1.5 rounded bg-neutral-500/5 hover:bg-red-500/20 text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
};
