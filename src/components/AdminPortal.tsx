import { useEffect, useState } from "react";
import {
  CalendarDays,
  KeyRound,
  LogOut,
  Lock,
  Save,
  Tags,
  Trash2,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_CREDENTIALS, useSalon } from "@/lib/salon-store";
import { Modal, fieldClass, labelClass } from "./Modal";
import { cn } from "@/lib/utils";

type Tab = "appointments" | "pricing" | "security";

export function AdminPortal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const {
    isAdmin,
    login,
    logout,
    appointments,
    updateStatus,
    removeAppointment,
    services,
    updatePrice,
    resetPrices,
    changePassword,
    credentials,
  } = useSalon();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("appointments");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [currentPw, setCurrentPw] = useState("");
  const [nextPw, setNextPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    if (open) {
      setError("");
      setPassword("");
      setTab("appointments");
    }
  }, [open]);

  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (login(username.trim(), password)) {
      toast.success("Welcome back", { description: "Admin session started." });
      setError("");
    } else {
      setError("Invalid credentials. Try the demo login below.");
    }
  };

  const savePrice = (id: string, name: string) => {
    const raw = drafts[id];
    const value = Number(raw);
    if (!raw || Number.isNaN(value) || value <= 0) {
      toast.error("Enter a valid price above 0");
      return;
    }
    updatePrice(id, Math.round(value));
    setDrafts((d) => ({ ...d, [id]: "" }));
    toast.success("Price updated", { description: `${name} is now $${Math.round(value)}` });
  };

  const submitPassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (nextPw.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (nextPw !== confirmPw) {
      toast.error("Passwords do not match");
      return;
    }
    if (!changePassword(currentPw, nextPw)) {
      toast.error("Current password is incorrect");
      return;
    }
    setCurrentPw("");
    setNextPw("");
    setConfirmPw("");
    toast.success("Password changed", { description: "Saved to this browser." });
  };

  if (!isAdmin) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Admin portal"
        subtitle="Staff access only — sign in to manage the salon."
      >
        <form onSubmit={submitLogin} className="space-y-5">
          <div>
            <label className={labelClass} htmlFor="admin-user">
              Username
            </label>
            <div className="relative">
              <UserRound className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="admin-user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className={cn(fieldClass, "pl-11")}
              />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="admin-pass">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(fieldClass, "pl-11")}
              />
            </div>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            className="bg-gold-gradient tap w-full rounded-full py-3 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            Sign in
          </button>
          <p className="glass rounded-xl p-3 text-xs text-muted-foreground">
            Demo credentials — username{" "}
            <span className="text-gold">{DEFAULT_CREDENTIALS.username}</span>, password{" "}
            <span className="text-gold">{DEFAULT_CREDENTIALS.password}</span>. Sessions are held in
            <span className="text-foreground"> sessionStorage</span>.
          </p>
        </form>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Admin dashboard"
      subtitle={`Signed in as ${credentials.username}`}
      className="max-w-4xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="glass flex flex-wrap gap-1 rounded-full p-1">
          {(
            [
              { id: "appointments", label: "Appointments", icon: CalendarDays },
              { id: "pricing", label: "Pricing", icon: Tags },
              { id: "security", label: "Password", icon: KeyRound },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "tap flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase",
                tab === item.id
                  ? "bg-gold-gradient text-primary-foreground"
                  : "text-muted-foreground hover:text-gold",
              )}
            >
              <item.icon className="h-3.5 w-3.5" /> {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            toast("Signed out");
          }}
          className="glass tap flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase hover:border-destructive/50 hover:text-destructive"
        >
          <LogOut className="h-3.5 w-3.5" /> Log out
        </button>
      </div>

      {tab === "appointments" ? (
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total", value: appointments.length },
              {
                label: "Pending",
                value: appointments.filter((a) => a.status === "Pending").length,
              },
              {
                label: "Revenue",
                value: `$${appointments.reduce(
                  (sum, a) => sum + (services.find((s) => s.id === a.serviceId)?.price ?? 0),
                  0,
                )}`,
              },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4">
                <p className="font-display text-xl font-semibold text-gold">{stat.value}</p>
                <p className="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <ul className="max-h-[45vh] space-y-3 overflow-y-auto pr-1">
            {appointments.length === 0 ? (
              <li className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
                No appointments yet.
              </li>
            ) : (
              appointments.map((appointment) => (
                <li key={appointment.id} className="glass rounded-2xl p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {appointment.name}{" "}
                        <span className="text-muted-foreground">· {appointment.phone}</span>
                      </p>
                      <p className="mt-1 text-sm text-gold">{appointment.serviceName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {appointment.date} at {appointment.time} · {appointment.email}
                      </p>
                      {appointment.notes ? (
                        <p className="mt-2 text-xs text-muted-foreground italic">
                          “{appointment.notes}”
                        </p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            appointment.id,
                            appointment.status === "Pending" ? "Confirmed" : "Pending",
                          )
                        }
                        className={cn(
                          "tap rounded-full px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] uppercase",
                          appointment.status === "Confirmed"
                            ? "bg-gold-gradient text-primary-foreground"
                            : "border border-gold/40 text-gold",
                        )}
                      >
                        {appointment.status}
                      </button>
                      <button
                        type="button"
                        aria-label="Delete appointment"
                        onClick={() => removeAppointment(appointment.id)}
                        className="tap flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-destructive/50 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}

      {tab === "pricing" ? (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Price changes persist in this browser via localStorage.
            </p>
            <button
              type="button"
              onClick={() => {
                resetPrices();
                toast("Prices reset to defaults");
              }}
              className="glass tap rounded-full px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase hover:border-gold/50 hover:text-gold"
            >
              Reset
            </button>
          </div>
          <ul className="mt-4 max-h-[45vh] space-y-2 overflow-y-auto pr-1">
            {services.map((service) => (
              <li
                key={service.id}
                className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4"
              >
                <div>
                  <p className="text-sm font-semibold">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.category} · current ${service.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={drafts[service.id] ?? ""}
                    onChange={(e) =>
                      setDrafts((d) => ({ ...d, [service.id]: e.target.value }))
                    }
                    placeholder={String(service.price)}
                    className={cn(fieldClass, "w-24 py-2")}
                  />
                  <button
                    type="button"
                    onClick={() => savePrice(service.id, service.name)}
                    className="bg-gold-gradient tap flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    <Save className="h-3.5 w-3.5" /> Save
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {tab === "security" ? (
        <form onSubmit={submitPassword} className="mt-6 max-w-md space-y-4">
          <div>
            <label className={labelClass} htmlFor="cur-pw">
              Current password
            </label>
            <input
              id="cur-pw"
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="new-pw">
              New password
            </label>
            <input
              id="new-pw"
              type="password"
              value={nextPw}
              onChange={(e) => setNextPw(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="conf-pw">
              Confirm new password
            </label>
            <input
              id="conf-pw"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className={fieldClass}
            />
          </div>
          <button
            type="submit"
            className="bg-gold-gradient tap w-full rounded-full py-3 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            Update password
          </button>
          <p className="text-xs text-muted-foreground">
            This is a mock portal for demo purposes — credentials live in this browser only.
          </p>
        </form>
      ) : null}
    </Modal>
  );
}
