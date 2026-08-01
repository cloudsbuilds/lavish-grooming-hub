import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useSalon } from "@/lib/salon-store";
import { Modal, fieldClass, labelClass } from "./Modal";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
  "18:30",
  "19:30",
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingModal({
  open,
  onClose,
  initialServiceId,
}: {
  open: boolean;
  onClose: () => void;
  initialServiceId?: string | undefined;
}) {
  const { services, addAppointment } = useSalon();
  const [serviceId, setServiceId] = useState(initialServiceId ?? services[0]!.id);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (open) {
      setConfirmed(false);
      setError("");
      if (initialServiceId) setServiceId(initialServiceId);
    }
  }, [open, initialServiceId]);

  const selected = useMemo(
    () => services.find((s) => s.id === serviceId) ?? services[0]!,
    [services, serviceId],
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !time || !date) {
      setError("Please complete every required field, including a time slot.");
      return;
    }
    setError("");
    addAppointment({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      serviceId,
      date,
      time,
      notes: notes.trim() || undefined,
    });
    setConfirmed(true);
    toast.success("Appointment requested", {
      description: `${selected.name} · ${date} at ${time}`,
    });
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setTime("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Book an appointment"
      subtitle="Reserve your chair in under a minute."
      className="max-w-2xl"
    >
      {confirmed ? (
        <div className="flex flex-col items-center py-6 text-center">
          <CheckCircle2 className="h-14 w-14 text-gold" />
          <h3 className="font-display mt-4 text-xl font-semibold">You&apos;re on the books</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Our front desk will confirm your slot by phone shortly. You can view the request in the
            admin dashboard.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmed(false)}
              className="glass tap rounded-full px-5 py-2.5 text-sm font-semibold hover:border-gold/50 hover:text-gold"
            >
              Book another
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gold-gradient tap rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className={labelClass} htmlFor="service">
              Service
            </label>
            <select
              id="service"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className={fieldClass}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — ${service.price} · {service.duration}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                min={todayISO()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 415 000 0000"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <span className={labelClass}>Time slot</span>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={
                    time === slot
                      ? "bg-gold-gradient tap rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-gold"
                      : "glass tap rounded-xl px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:border-gold/40 hover:text-gold"
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="James Sinclair"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="notes">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Preferred barber, allergies, styling references…"
              className={fieldClass}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">
              Total due in salon:{" "}
              <span className="font-display text-lg font-semibold text-gold">
                ${selected.price}
              </span>
            </p>
            <button
              type="submit"
              className="bg-gold-gradient tap flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold"
            >
              <CalendarCheck className="h-4 w-4" /> Confirm booking
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
