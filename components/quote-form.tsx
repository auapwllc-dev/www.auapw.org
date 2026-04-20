'use client'

import { useState } from 'react'
import { CAR_MAKES, CAR_MODELS, YEARS } from '@/lib/data'
import { Phone, AlertCircle, CheckCircle2, Plus, X, FileText, Mail, Download } from 'lucide-react'

const CONTACT_EMAIL = 'support@auapw.org'
const PHONE_DISPLAY = '(888) 818-5001'

interface QuoteItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

interface QuoteFormProps {
  defaultPart?: 'Engine' | 'Transmission' | ''
  compact?: boolean
  showInvoice?: boolean
}

export function QuoteForm({ defaultPart = '', compact = false, showInvoice = true }: QuoteFormProps) {
  const [part, setPart] = useState(defaultPart)
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [option, setOption] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 }
  ])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0
    }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!make) { setError('Please select a vehicle make.'); return }
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!phone.trim()) { setError('Please enter your phone number.'); return }
    if (items.some(item => !item.description.trim())) { setError('Please fill in all part descriptions.'); return }

    // Build email body with items
    const itemsText = items
      .map(item => `- ${item.description}: ${item.quantity} x $${item.unitPrice.toFixed(2)} = $${(item.quantity * item.unitPrice).toFixed(2)}`)
      .join('\n')

    const subject = `Quote Request: ${year || ''} ${make} ${model || ''} - ${part || 'Auto Parts'}`.trim()

    const body = [
      `Quote Request from All Auto Part Store`,
      ``,
      `--- Vehicle Details ---`,
      `Make: ${make}`,
      `Model: ${model || 'Not specified'}`,
      `Year: ${year || 'Not specified'}`,
      `Option: ${option || 'Not specified'}`,
      ``,
      `--- Parts Requested ---`,
      itemsText,
      ``,
      `Subtotal: $${subtotal.toFixed(2)}`,
      `Tax (8%): $${tax.toFixed(2)}`,
      `Total: $${total.toFixed(2)}`,
      ``,
      `--- Customer Details ---`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || 'Not provided'}`,
      `ZIP: ${zip || 'Not provided'}`,
      ``,
      `--- Message ---`,
      message || '(no additional details)',
    ].join('\n')

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    const link = document.createElement('a')
    link.href = mailtoUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        {/* Glass invoice container */}
        <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-8 shadow-2xl border-2 border-gray-400">
          
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-400">
            <h2 className="text-3xl font-black uppercase tracking-widest text-gray-800 mb-2">
              Invoice / Receipt
            </h2>
          </div>

          {/* Items table */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 mb-6">
            <div className="grid grid-cols-12 gap-2 text-sm font-bold text-gray-800 uppercase tracking-wider px-4 py-3 bg-gray-100 rounded-lg mb-4">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-4 text-right">Amount</div>
            </div>
            
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-200 text-gray-800">
                <div className="col-span-6 text-sm">{item.description}</div>
                <div className="col-span-2 text-center text-sm">{item.quantity}</div>
                <div className="col-span-4 text-right text-sm">${(item.quantity * item.unitPrice).toFixed(2)}</div>
              </div>
            ))}

            {/* Totals */}
            <div className="space-y-2 mt-6 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Tax:</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Total paid box */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 border-2 border-green-800 mb-6 text-center">
            <div className="text-white font-black text-3xl tracking-wider">
              TOTAL PAID: ${total.toFixed(2)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="auapw-btn auapw-btn-silver auapw-btn-lg flex-1">
              <Download className="w-5 h-5" />
              Download PDF Invoice
            </button>
            <button className="auapw-btn auapw-btn-teal auapw-btn-lg flex-1">
              <Mail className="w-5 h-5" />
              Email Quote
            </button>
            <button className="auapw-btn auapw-btn-green auapw-btn-lg flex-1">
              <Phone className="w-5 h-5" />
              Call To Order
            </button>
          </div>

          {/* Payment methods */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300">
            <p className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide mb-6">
              Secure Payment Methods
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg border border-blue-700 mb-2">
                  <span className="text-white font-black text-lg">VISA</span>
                </div>
                <p className="text-xs font-bold text-gray-600 uppercase">Secure Payment</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-16 bg-gradient-to-br from-red-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg border border-orange-700 mb-2">
                  <span className="text-white font-black text-lg">MC</span>
                </div>
                <p className="text-xs font-bold text-gray-600 uppercase">Secure Payment</p>
              </div>
            </div>
          </div>

          {/* Success message */}
          <div className="mt-8 bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-900 mb-2">Quote Submitted!</h3>
            <p className="text-green-800 text-sm mb-4">
              Your email client should open with the quote. If not, contact us directly.
            </p>
            <button
              onClick={() => {
                setSuccess(false)
                setPart(defaultPart)
                setMake(''); setModel(''); setYear(''); setOption('')
                setName(''); setPhone(''); setEmail(''); setZip(''); setMessage('')
                setItems([{ id: '1', description: '', quantity: 1, unitPrice: 0 }])
              }}
              className="text-green-700 font-bold hover:underline text-sm"
            >
              Submit another quote
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Glass Container */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-8 shadow-2xl border-2 border-gray-400">
        
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-400">
          <h2 className="text-3xl font-black uppercase tracking-widest text-gray-800 mb-2">
            Request A Quote
          </h2>
          <p className="text-sm font-medium text-gray-600 tracking-wide">
            Get a quick quote for the parts you need
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="flex items-center gap-3 px-6 py-4 bg-red-100 border-2 border-red-400 rounded-2xl" role="alert">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <span className="text-red-800 font-semibold">{error}</span>
            </div>
          )}

          {/* Vehicle Information */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide mb-4">
              Vehicle Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Make <span className="text-red-600">*</span>
                </label>
                <select value={make} onChange={(e) => { setMake(e.target.value); setModel('') }} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select Make</option>
                  {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Model
                </label>
                <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={!make}>
                  <option value="">{make ? 'Select Model' : 'Select Make First'}</option>
                  {(make ? CAR_MODELS[make] || [] : []).map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Year
                </label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Option
                </label>
                <select value={option} onChange={(e) => setOption(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Option</option>
                  <option value="2WD">2WD</option>
                  <option value="4WD">4WD</option>
                  <option value="AWD">AWD</option>
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Part Type
                </label>
                <select value={part} onChange={(e) => setPart(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Part</option>
                  <option value="Engine">Engine</option>
                  <option value="Transmission">Transmission</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide mb-4">
              Your Contact Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Email
                </label>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  ZIP Code
                </label>
                <input type="text" inputMode="numeric" placeholder="ZIP Code" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          {/* Parts/Items */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide mb-4">
              Parts Requested
            </h3>
            
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-12 gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider px-3 py-2 bg-gray-100 rounded-lg">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-3 text-right">Unit Price</div>
                <div className="col-span-1"></div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Part description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="col-span-6 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                    className="col-span-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                    className="col-span-3 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="col-span-1 flex items-center justify-center p-2 hover:bg-red-100 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="auapw-btn auapw-btn-blue auapw-btn-sm"
            >
              <Plus className="w-4 h-4" />
              Add Another Part
            </button>
          </div>

          {/* Totals Preview */}
          {showInvoice && (
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 border-2 border-gray-400 space-y-3">
              <div className="flex justify-between items-center text-gray-700 font-semibold">
                <span>Subtotal:</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 font-semibold">
                <span>Tax (8%):</span>
                <span className="font-mono">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-400"></div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 text-center border-2 border-green-800">
                <div className="text-white font-black text-2xl tracking-wider">
                  TOTAL: ${total.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {!compact && (
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-300">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                Additional Details
              </label>
              <textarea
                placeholder="Any additional details about the parts you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              className="auapw-btn auapw-btn-amber auapw-btn-lg flex-1"
            >
              <FileText className="w-5 h-5" />
              Send Quote Request
            </button>
            <button
              type="button"
              className="auapw-btn auapw-btn-teal auapw-btn-lg flex-1"
            >
              <Mail className="w-5 h-5" />
              Email Quote
            </button>
            <button
              type="button"
              className="auapw-btn auapw-btn-green auapw-btn-lg flex-1"
            >
              <Phone className="w-5 h-5" />
              Call (888) 818-5001
            </button>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300">
            <p className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide mb-6">
              Secure Payment Methods
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg border border-blue-700 mb-2">
                  <span className="text-white font-black text-lg">VISA</span>
                </div>
                <p className="text-xs font-bold text-gray-600 uppercase">Secure</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-16 bg-gradient-to-br from-red-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg border border-orange-700 mb-2">
                  <span className="text-white font-black text-lg">MC</span>
                </div>
                <p className="text-xs font-bold text-gray-600 uppercase">Secure</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
