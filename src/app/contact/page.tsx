'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDesktopMotion } from '@/hooks/use-desktop-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
} from 'lucide-react';

type ClinicOption = {
  id: string;
  title: string;
  phone?: string;
  phoneDisplay?: string;
  note: string;
};

type RequestTypeOption = {
  value: string;
  label: string;
};

type FormValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  requestType: string;
  message: string;
  gdprAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>> & {
  form?: string;
};

const TEMPORARY_GDPR_LABEL =
  'Sunt de acord cu prelucrarea datelor mele pentru a fi contactat în legătură cu această solicitare.';

const TEMPORARY_SUCCESS_MESSAGE =
  'Solicitarea a fost trimisă. Revenim către tine după verificare.';

const clinics: ClinicOption[] = [
  {
    id: 'bucuresti',
    title: 'București',
    phone: '0731326536',
    phoneDisplay: '0731 326 536',
    note: 'Potrivit pentru solicitările legate de cabinetul din București.',
  },
  {
    id: 'belciugatele',
    title: 'Belciugatele',
    phone: '0769410728',
    phoneDisplay: '0769 410 728',
    note: 'Poți selecta această locație pentru întrebări sau programări dedicate cabinetului din Belciugatele.',
  },
  {
    id: 'valea-calugareasca',
    title: 'Valea Călugărească',
    phone: '0711042920',
    phoneDisplay: '0711 042 920',
    note: 'Poți trimite solicitarea direct pentru cabinetul din Valea Călugărească.',
  },
  {
    id: 'indrumare',
    title: 'Nu sunt sigur / am nevoie de îndrumare',
    note: 'Dacă nu știi exact ce locație ți se potrivește, poți trimite solicitarea și te ghidăm ulterior.',
  },
];

const requestTypes: RequestTypeOption[] = [
  { value: 'programare', label: 'Programare' },
  { value: 'informatii-tratament', label: 'Informații despre tratament' },
  { value: 'informatii-tarife', label: 'Informații despre tarife' },
  { value: 'administrativ', label: 'Întrebare administrativă' },
  { value: 'alta', label: 'Altă solicitare' },
];

const initialFormValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  location: '',
  requestType: '',
  message: '',
  gdprAccepted: false,
};

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

function getValidationErrors(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Te rugăm să completezi numele și prenumele.';
  }

  const normalizedPhone = values.phone.replace(/[^\d+]/g, '');
  if (!normalizedPhone) {
    errors.phone = 'Te rugăm să completezi numărul de telefon.';
  } else if (normalizedPhone.replace(/\D/g, '').length < 9) {
    errors.phone = 'Te rugăm să verifici numărul de telefon.';
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Adresa de email nu pare validă.';
  }

  if (!values.location) {
    errors.location = 'Te rugăm să alegi cabinetul dorit.';
  }

  if (!values.requestType) {
    errors.requestType = 'Te rugăm să alegi tipul solicitării.';
  }

  if (!values.message.trim()) {
    errors.message = 'Te rugăm să completezi mesajul.';
  }

  if (!values.gdprAccepted) {
    errors.gdprAccepted = 'Este necesar acordul pentru a putea trimite formularul.';
  }

  return errors;
}

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-dental-heading">
      {children}
      {optional ? <span className="ml-1 font-normal text-dental-body">(opțional)</span> : null}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-[#b42318]">{message}</p>;
}

function useScrollDots(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateActiveIndex();

    const onScroll = () => updateActiveIndex();
    const onResize = () => updateActiveIndex();

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateActiveIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const target = children[index];
    if (!target) return;

    const left =
      target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2;

    container.scrollTo({
      left,
      behavior: 'smooth',
    });
  }, []);

  return {
    containerRef,
    activeIndex,
    scrollToIndex,
    itemCount,
  };
}

function ScrollDots({
  activeIndex,
  itemCount,
  onSelect,
}: {
  activeIndex: number;
  itemCount: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center gap-2 md:hidden">
      {Array.from({ length: itemCount }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            aria-label={`Mergi la cardul ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              isActive
                ? 'scale-110 bg-dental-mint'
                : 'bg-dental-blueDark/20 hover:bg-dental-blueDark/35'
            }`}
          />
        );
      })}
    </div>
  );
}

export default function ContactPage() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const processCardsScroll = useScrollDots(3);

  const selectedClinic = useMemo(
    () => clinics.find((clinic) => clinic.id === formValues.location),
    [formValues.location]
  );

  const enableMotion = useDesktopMotion();

  const onFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const fieldName = event.target.name as keyof FormValues;
    const nextValue =
      event.target.type === 'checkbox' && 'checked' in event.target
        ? event.target.checked
        : event.target.value;

    setFormValues((prev) => ({
      ...prev,
      [fieldName]: nextValue as FormValues[keyof FormValues],
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
      form: undefined,
    }));

    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = getValidationErrors(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setFeedbackMessage('Te rugăm să verifici câmpurile marcate și să încerci din nou.');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          phone: formValues.phone,
          email: formValues.email,
          location: formValues.location,
          message: formValues.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      setFeedbackMessage(TEMPORARY_SUCCESS_MESSAGE);
      setFormValues(initialFormValues);
    } catch (error) {
      console.error('Contact form submit failed:', error);
      setStatus('error');
      setFeedbackMessage(
        'Solicitarea nu a putut fi trimisă momentan. Te rugăm să încerci din nou sau să ne contactezi telefonic.'
      );
    }
  };

  const processCards = [
    {
      icon: MapPin,
      title: 'Alegi cabinetul',
      text: 'Selectezi locația dorită sau poți menționa că ai nevoie de îndrumare.',
    },
    {
      icon: MessageSquare,
      title: 'Trimiți solicitarea',
      text: 'Completezi rapid formularul și ne lași detaliile importante pentru a reveni clar către tine.',
    },
    {
      icon: CalendarDays,
      title: 'Echipa revine către tine',
      text: 'După trimitere, solicitarea este verificată, iar echipa revine către tine cu pașii următori.',
    },
  ] as const;

  return (
    <div className="bg-white text-dental-body">
      <section className="relative overflow-hidden border-b border-dental-blueDark/10 bg-dental-blue/45">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,177,168,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(126,169,219,0.18),transparent_30%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={enableMotion ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={enableMotion ? { duration: 0.35, ease: "easeOut" } : { duration: 0 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
              Contact Duo Dent
            </p>
            <h1 className="font-rounded text-4xl font-bold tracking-tight text-dental-heading sm:text-5xl">
              Contact și programări
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-dental-body">
              Trimite solicitarea ta, alege cabinetul dorit și revenim către tine pentru
              detalii, orientare sau programare.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#formular-contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-heading px-6 py-3.5 font-rounded text-sm font-bold text-white transition hover:bg-[#2d3d44]"
              >
                Completează formularul
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-dental-blueDark/10 bg-white" data-aos="fade-up">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4 }}
            className="rounded-[28px] border border-dental-blueDark/10 bg-dental-blue/35 p-4 shadow-sm sm:p-6"
          >
            <div className="overflow-x-auto scrollbar-hide scroll-snap-x md:overflow-visible">
              <div
                ref={processCardsScroll.containerRef}
                className="flex gap-5 snap-x snap-mandatory overflow-x-auto scrollbar-hide scroll-snap-x pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:snap-none"
              >
                {processCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="w-[calc(100vw-2.5rem)] max-w-[23rem] flex-shrink-0 snap-center rounded-[24px] border border-white/70 bg-white px-5 py-5 shadow-sm md:w-auto md:max-w-none"
                    >
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-dental-mint/15 text-dental-mintDark">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="font-rounded text-xl font-bold text-dental-heading">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-dental-body">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <ScrollDots
              activeIndex={processCardsScroll.activeIndex}
              itemCount={processCardsScroll.itemCount}
              onSelect={processCardsScroll.scrollToIndex}
            />
          </motion.div>
        </div>
      </section>

      <section id="formular-contact" className="bg-dental-blue/40" data-aos="fade-up">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
              Formular principal
            </p>
            <h2 className="mt-3 font-rounded text-3xl font-bold text-dental-heading sm:text-4xl">
              Trimite o solicitare clară, ușor de preluat
            </h2>
            <p className="mt-4 text-base leading-7 text-dental-body sm:text-lg">
              Completezi câmpurile esențiale, alegi cabinetul dorit, iar echipa poate reveni
              către tine cu pașii următori.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_380px] lg:items-start">
            <div className="order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="mb-6 rounded-[30px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)] lg:hidden"
              >
                <h3 className="font-rounded text-xl font-bold text-dental-heading">
                  Ce se întâmplă după trimitere
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-6 text-dental-body">
                  <div className="flex gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 flex-none text-dental-mintDark" />
                    <p>După trimitere, echipa revine către tine pentru confirmare sau pentru detaliile necesare.</p>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 flex-none text-dental-mintDark" />
                    <p>Telefonul rămâne cea mai rapidă variantă de contact, iar emailul poate fi completat dacă dorești și un răspuns în scris.</p>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-dental-mintDark" />
                    <p>Primești un răspuns sau o orientare în funcție de tipul solicitării trimise.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="rounded-[32px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)] sm:p-8"
              >
                <form onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <FieldLabel htmlFor="name">Nume și prenume</FieldLabel>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formValues.name}
                        onChange={onFieldChange}
                        className="w-full rounded-[18px] border border-dental-blueDark/10 bg-white px-4 py-3.5 text-base text-dental-heading outline-none transition placeholder:text-dental-body/60 focus:border-dental-mint focus:ring-4 focus:ring-dental-mint/10"
                        placeholder="Ex. Andreea Popescu"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      <div id="name-error">
                        <FieldError message={errors.name} />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <FieldLabel htmlFor="phone">Telefon</FieldLabel>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formValues.phone}
                        onChange={onFieldChange}
                        className="w-full rounded-[18px] border border-dental-blueDark/10 bg-white px-4 py-3.5 text-base text-dental-heading outline-none transition placeholder:text-dental-body/60 focus:border-dental-mint focus:ring-4 focus:ring-dental-mint/10"
                        placeholder="Ex. 07xx xxx xxx"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      <div id="phone-error">
                        <FieldError message={errors.phone} />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <FieldLabel htmlFor="email" optional>
                        Email
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dental-body/60" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formValues.email}
                          onChange={onFieldChange}
                          className="w-full rounded-[18px] border border-dental-blueDark/10 bg-white py-3.5 pl-11 pr-4 text-base text-dental-heading outline-none transition placeholder:text-dental-body/60 focus:border-dental-mint focus:ring-4 focus:ring-dental-mint/10"
                          placeholder="Ex. nume@email.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby="email-helper email-error"
                        />
                      </div>
                      <p id="email-helper" className="mt-2 text-sm text-dental-body">
                        Completează doar dacă dorești și un răspuns în scris.
                      </p>
                      <div id="email-error">
                        <FieldError message={errors.email} />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <FieldLabel htmlFor="location">Cabinet dorit</FieldLabel>
                      <div className="relative">
                        <select
                          id="location"
                          name="location"
                          value={formValues.location}
                          onChange={onFieldChange}
                          className="w-full appearance-none rounded-[18px] border border-dental-blueDark/10 bg-white px-4 py-3.5 pr-12 text-base text-dental-heading outline-none transition focus:border-dental-mint focus:ring-4 focus:ring-dental-mint/10"
                          aria-invalid={Boolean(errors.location)}
                          aria-describedby={errors.location ? 'location-error' : undefined}
                        >
                          <option value="">Selectează cabinetul</option>
                          {clinics.map((clinic) => (
                            <option key={clinic.id} value={clinic.id}>
                              {clinic.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dental-body/70" />
                      </div>
                      <div id="location-error">
                        <FieldError message={errors.location} />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="requestType">Tip solicitare</FieldLabel>
                      <div className="relative">
                        <select
                          id="requestType"
                          name="requestType"
                          value={formValues.requestType}
                          onChange={onFieldChange}
                          className="w-full appearance-none rounded-[18px] border border-dental-blueDark/10 bg-white px-4 py-3.5 pr-12 text-base text-dental-heading outline-none transition focus:border-dental-mint focus:ring-4 focus:ring-dental-mint/10"
                          aria-invalid={Boolean(errors.requestType)}
                          aria-describedby={errors.requestType ? 'requestType-error' : undefined}
                        >
                          <option value="">Selectează tipul solicitării</option>
                          {requestTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dental-body/70" />
                      </div>
                      <div id="requestType-error">
                        <FieldError message={errors.requestType} />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="message">Mesaj</FieldLabel>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formValues.message}
                        onChange={onFieldChange}
                        className="w-full rounded-[22px] border border-dental-blueDark/10 bg-white px-4 py-3.5 text-base text-dental-heading outline-none transition placeholder:text-dental-body/60 focus:border-dental-mint focus:ring-4 focus:ring-dental-mint/10"
                        placeholder="Spune-ne pe scurt ce te interesează sau ce informații dorești."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      <div id="message-error">
                        <FieldError message={errors.message} />
                      </div>
                    </div>
                  </div>

                    <div className="mt-6 rounded-[24px] border border-dental-blueDark/10 bg-dental-blue/30 p-4 sm:p-5">
                      <label className="flex items-start gap-3">
                        <input
                          id="gdprAccepted"
                          name="gdprAccepted"
                          type="checkbox"
                          checked={formValues.gdprAccepted}
                          onChange={onFieldChange}
                          className="mt-1 h-4 w-4 rounded border-dental-blueDark/20 text-dental-mint focus:ring-dental-mint/30"
                          aria-invalid={Boolean(errors.gdprAccepted)}
                          aria-describedby={errors.gdprAccepted ? 'gdpr-error' : 'gdpr-helper'}
                        />
                        <span className="text-sm leading-6 text-dental-body">
                          {TEMPORARY_GDPR_LABEL}
                          <span id="gdpr-helper" className="mt-1 block text-dental-body/80">
                          </span>
                        </span>
                      </label>
                      <div id="gdpr-error">
                        <FieldError message={errors.gdprAccepted} />
                      </div>
                    </div>

                    <input type="text" name="website" style={{ display: 'none' }} />

                  <div className="mt-6 flex flex-col gap-4 border-t border-dental-blueDark/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-h-[24px]" aria-live="polite">
                      {feedbackMessage ? (
                        <p
                          className={`text-sm ${
                            status === 'success' ? 'text-dental-mintDark' : 'text-[#b42318]'
                          }`}
                        >
                          {feedbackMessage}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dental-heading px-6 py-3.5 font-rounded text-sm font-bold text-white transition hover:bg-[#2d3d44] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'submitting' ? 'Se trimite...' : 'Trimite solicitarea'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="order-2 hidden space-y-5 lg:sticky lg:top-24 lg:block"
            >
              <div className="rounded-[30px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dental-mintDark/85">
                  Orientare rapidă
                </p>
                <h3 className="mt-3 font-rounded text-2xl font-bold text-dental-heading">
                  {selectedClinic?.title ?? 'Alegi cabinetul potrivit'}
                </h3>
                <p className="mt-3 text-sm leading-6 text-dental-body">
                  {selectedClinic?.note ??
                    'Poți selecta direct locația dorită sau poți trimite solicitarea cu opțiunea de îndrumare, iar echipa te poate orienta ulterior.'}
                </p>

                {selectedClinic?.phone && selectedClinic.phoneDisplay ? (
                  <a
                    href={phoneHref(selectedClinic.phone)}
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-dental-mint px-5 py-3 text-sm font-semibold text-white transition hover:bg-dental-mintDark"
                  >
                    <Phone className="h-4 w-4" />
                    {selectedClinic.phoneDisplay}
                  </a>
                ) : (
                  <div>
                  </div>
                )}
              </div>

              <div className="rounded-[30px] border border-dental-blueDark/10 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(17,24,39,0.28)]">
                <h3 className="font-rounded text-xl font-bold text-dental-heading">
                  Ce se întâmplă după trimitere
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-6 text-dental-body">
                  <div className="flex gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 flex-none text-dental-mintDark" />
                    <p>După trimitere, echipa revine către tine pentru confirmare sau pentru detaliile necesare.</p>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 flex-none text-dental-mintDark" />
                    <p>Telefonul rămâne cea mai rapidă variantă de contact, iar emailul poate fi completat dacă dorești și un răspuns în scris.</p>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-dental-mintDark" />
                    <p>Primești un răspuns sau o orientare în funcție de tipul solicitării trimise.</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}