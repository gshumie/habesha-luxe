"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Filter,
  Package,
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  DollarSign,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { Order, DispatchStatus, PaymentStatus } from "@/types/order";
import { formatETB, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If authenticated in session, fetch orders
    const storedAuth = sessionStorage.getItem("hl_admin_auth");
    if (storedAuth === "true") {
      setAuthenticated(true);
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "habesha-luxe-admin-2025" || passcode === "admin") {
      setAuthenticated(true);
      sessionStorage.setItem("hl_admin_auth", "true");
      setAuthError(false);
      fetchOrders();
    } else {
      setAuthError(true);
    }
  };

  const handleUpdateDispatchStatus = async (orderId: string, newStatus: DispatchStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, dispatchStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(data.order);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all") {
      if (statusFilter === "paid" && o.paymentStatus !== "paid") return false;
      if (statusFilter === "pending" && o.paymentStatus !== "pending") return false;
      if (["processing", "tailoring", "out_for_delivery", "delivered"].includes(statusFilter)) {
        if (o.dispatchStatus !== statusFilter) return false;
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase().includes(q);
      const matchPhone = o.customer.phoneNumber.includes(q);
      const matchRef = o.txRef.toLowerCase().includes(q);
      const matchCity = (o.customer.subCity || o.customer.city || "").toLowerCase().includes(q);
      return matchName || matchPhone || matchRef || matchCity;
    }
    return true;
  });

  // Analytics Metrics
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.grandTotalETB, 0);
  const paidCount = orders.filter((o) => o.paymentStatus === "paid").length;
  const pendingCount = orders.filter((o) => o.paymentStatus === "pending").length;

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-obsidian-950">
        <div className="w-full max-w-sm bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-ivory-100">
              Admin & Store Portal
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Habesha Luxe Order & Dispatch Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <input
              type="password"
              placeholder="Enter Admin Passcode..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
              autoFocus
            />

            {authError && (
              <p className="text-[11px] text-red-400">
                Invalid passcode. (Hint: <code>habesha-luxe-admin-2025</code>)
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-serif font-black text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20"
            >
              Access Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => {
                setPasscode("habesha-luxe-admin-2025");
              }}
              className="text-[11px] text-gold-400 hover:underline"
            >
              Fill Demo Passcode (habesha-luxe-admin-2025)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Habesha Luxe Store Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-ivory-100">
              Orders & Dispatch Management
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchOrders}
              className="p-2.5 rounded-xl bg-obsidian-900 border border-zinc-700 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              View Storefront
            </Link>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 shadow-lg space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Total Chapa Revenue
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-gold-400">
              {formatETB(totalRevenue)}
            </div>
            <div className="text-[11px] text-emerald-400">Settled via Telebirr & CBE</div>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 shadow-lg space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Total Placed Orders
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-ivory-100">
              {orders.length}
            </div>
            <div className="text-[11px] text-zinc-400">All channels</div>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 shadow-lg space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Verified Paid
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-emerald-400">
              {paidCount}
            </div>
            <div className="text-[11px] text-emerald-500/80">Chapa status: Success</div>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 shadow-lg space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Pending Authorization
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-amber-400">
              {pendingCount}
            </div>
            <div className="text-[11px] text-amber-500/80">Awaiting customer payment</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between bg-obsidian-900 p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by customer, phone, or tx_ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Orders" },
              { id: "paid", label: "Paid" },
              { id: "pending", label: "Pending" },
              { id: "tailoring", label: "Tailoring" },
              { id: "out_for_delivery", label: "Out for Delivery" },
              { id: "delivered", label: "Delivered" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  statusFilter === f.id
                    ? "bg-gold-500 text-obsidian-950 font-bold"
                    : "bg-obsidian-950 text-zinc-400 hover:text-ivory-100 border border-zinc-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-obsidian-900 rounded-2xl border border-gold-500/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-obsidian-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Tx Reference / Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items / Total</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Dispatch Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      No orders matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-obsidian-850/60 transition-colors group cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {/* Ref & Date */}
                      <td className="py-4 px-4">
                        <div className="font-mono font-bold text-gold-400">{order.txRef}</div>
                        <div className="text-[10px] text-zinc-500">{formatDate(order.createdAt)}</div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-4">
                        <div className="font-serif font-bold text-ivory-100">
                          {order.customer.firstName} {order.customer.lastName}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center space-x-1 mt-0.5">
                          <Phone className="w-3 h-3 text-gold-400 shrink-0" />
                          <span>{order.customer.phoneNumber}</span>
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {order.customer.subCity || order.customer.city}
                        </div>
                      </td>

                      {/* Items & Total */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-ivory-100 font-serif">
                          {formatETB(order.grandTotalETB)}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </div>
                      </td>

                      {/* Payment Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.paymentStatus === "paid"
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                              : order.paymentStatus === "pending"
                              ? "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                              : "bg-red-950/80 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                        {order.paymentMethod && (
                          <div className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                            {order.paymentMethod}
                          </div>
                        )}
                      </td>

                      {/* Dispatch Status Dropdown */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.dispatchStatus}
                          onChange={(e) =>
                            handleUpdateDispatchStatus(order.id, e.target.value as DispatchStatus)
                          }
                          className="bg-obsidian-950 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                        >
                          <option value="processing">Processing</option>
                          <option value="tailoring">Tailoring</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="px-2.5 py-1 rounded bg-obsidian-950 border border-zinc-700 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 text-xs inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div
              className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start border-b border-gold-500/20 pb-4">
                <div>
                  <div className="text-xs font-mono text-gold-400 font-bold">
                    Order Ref: {selectedOrder.txRef}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ivory-100">
                    Order Details & Dispatch Record
                  </h3>
                  <div className="text-xs text-zinc-400">{formatDate(selectedOrder.createdAt)}</div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-full bg-obsidian-850 text-zinc-400 hover:text-ivory-100"
                >
                  ✕
                </button>
              </div>

              {/* Customer and Delivery info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-obsidian-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <span className="font-bold text-gold-400 uppercase tracking-wider block">
                    Customer Information
                  </span>
                  <div className="text-sm font-bold text-ivory-100">
                    {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <a
                      href={`tel:${selectedOrder.customer.phoneNumber}`}
                      className="text-gold-400 hover:underline font-semibold"
                    >
                      {selectedOrder.customer.phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Mail className="w-3.5 h-3.5 text-gold-400" />
                    <span>{selectedOrder.customer.email}</span>
                  </div>
                </div>

                <div className="bg-obsidian-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <span className="font-bold text-gold-400 uppercase tracking-wider block">
                    Delivery & Address
                  </span>
                  <div className="text-ivory-100 font-semibold">
                    Zone: {selectedOrder.customer.deliveryZone}
                  </div>
                  {selectedOrder.customer.subCity && (
                    <div className="text-zinc-300">Sub-city: {selectedOrder.customer.subCity}</div>
                  )}
                  {selectedOrder.customer.houseNumber && (
                    <div className="text-zinc-300">House: {selectedOrder.customer.houseNumber}</div>
                  )}
                  {selectedOrder.customer.specificAddress && (
                    <div className="text-zinc-300">Landmark: {selectedOrder.customer.specificAddress}</div>
                  )}
                  {selectedOrder.customer.deliveryNotes && (
                    <div className="text-zinc-400 italic">
                      Notes: &ldquo;{selectedOrder.customer.deliveryNotes}&rdquo;
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-gold-400 block">
                  Couture Items Ordered ({selectedOrder.items.length})
                </span>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-obsidian-950 p-3 rounded-xl border border-zinc-800 text-xs"
                    >
                      <div>
                        <div className="font-serif font-bold text-ivory-100">{item.product.name}</div>
                        <div className="text-[11px] text-zinc-400">
                          Size: <span className="text-gold-400 font-semibold">{item.selectedSize}</span> • Qty: {item.quantity}
                        </div>
                        {item.customMeasurements && (
                          <div className="text-[10px] text-emerald-400 mt-1">
                            Measurements: Bust: {item.customMeasurements.bust || "-"} | Waist: {item.customMeasurements.waist || "-"} | Hips: {item.customMeasurements.hips || "-"}
                            {item.customMeasurements.notes && ` (Notes: ${item.customMeasurements.notes})`}
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-gold-400 text-sm">
                        {formatETB(item.product.priceETB * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-obsidian-950 p-4 rounded-xl border border-gold-500/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                <div>
                  <div className="text-zinc-400">Payment Gateway:</div>
                  <div className="font-semibold text-ivory-100">
                    {selectedOrder.paymentMethod || "Chapa (Telebirr / CBE Birr)"}
                  </div>
                  {selectedOrder.chapaTransactionId && (
                    <div className="text-[11px] text-zinc-500">
                      Chapa ID: {selectedOrder.chapaTransactionId}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-zinc-400">Grand Total:</div>
                  <div className="text-xl font-serif font-black text-gold-400">
                    {formatETB(selectedOrder.grandTotalETB)}
                  </div>
                </div>
              </div>

              {/* Modal footer actions */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  href={`/checkout/success?tx_ref=${selectedOrder.txRef}`}
                  target="_blank"
                  className="text-xs text-gold-400 hover:underline flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Printable Official Invoice</span>
                </Link>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 rounded-xl bg-obsidian-850 border border-zinc-700 text-xs text-ivory-100 hover:bg-obsidian-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
