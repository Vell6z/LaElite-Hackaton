import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "¿Lardi reemplaza a un abogado profesional?",
    answer: "No. Lardi es tu primer punto de orientación: te ayuda a entender la situación, traducir el lenguaje jurídico a cristiano y sugerir pasos accionables. Pero nunca sustituye la asesoría profesional ni la representación de un abogado de carne y hueso."
  },
  {
    question: "¿De dónde saca Lardi las normas y respuestas?",
    answer: "Lardi no inventa leyes ni saca artículos de la manga. Utiliza tecnología de consulta sobre corpus normativos reales y vigentes para fundamentar sus respuestas con artículos y citas legales concretas."
  },
  {
    question: "¿Necesito saber de leyes o hablar formal para usarlo?",
    answer: "¡Para nada! Cuéntale a Lardi qué pasó tal cual, con tus propias palabras. No tienes que fingir que eres juez ni usar términos raros; Lardi se encarga de desenredar el enredo."
  },
  {
    question: "¿Qué tipo de trámites o situaciones puedo consultarle?",
    answer: "Puedes consultarle sobre contratos de arrendamiento, dudas laborales o liquidaciones, borradores de derechos de petición, tutelas o simplemente entender esa carta o notificación con letra chiquita que no sabes por dónde agarrar."
  },
  {
    question: "¿Mis documentos y datos están seguros?",
    answer: "Completamente. La información que compartes se procesa de forma segura y confidencial. Lardi cuida tus datos y documentos como si fueran sus nueces más preciadas."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[#F9F6F0] py-24 px-6 relative">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Columna Derecha (Visual / Lardi) - Pasa arriba en móvil */}
        <div className="w-full lg:w-2/5 lg:order-2 flex justify-center items-center">
          <div className="relative w-full max-w-[320px] lg:max-w-[400px]">
            {/* Lardi Ilustración placeholder */}
            <div className="relative w-full aspect-square flex justify-center items-center">
              {/* Organic blob background to simulate floating/organic feel instead of a square box */}
              <div className="absolute inset-0 bg-[#E8E1D5] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[blob_8s_ease-in-out_infinite] opacity-50"></div>
              
              <img 
                src="/LardiStudiando.png" 
                alt="Lardi asesora sentada sobre libros"
                className="w-[85%] h-[85%] object-cover rounded-[50%_40%_60%_40%/40%_60%_50%_45%] z-10 shadow-[0_10px_25px_-5px_rgba(10,30,15,0.1)] relative transition-transform duration-500 hover:scale-105 bg-white/50" 
              />
              
              {/* Decoración sutil flotante */}
              <div className="absolute top-4 right-8 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center animate-[bounce_3s_infinite] shadow-md border border-[#F9F6F0]">
                <span className="text-moss-700 text-xl font-bold">?</span>
              </div>
              <div className="absolute bottom-8 left-4 z-20 w-8 h-8 bg-acorn-300 rounded-full flex items-center justify-center animate-[bounce_4s_infinite] shadow-sm">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Izquierda (Contenido y Acordeón) */}
        <div className="w-full lg:w-3/5 lg:order-1 flex flex-col">
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-[#1E3F20] mb-3 text-left tracking-tight">
            ¿Dudas antes de desenredar tu trámite?
          </h2>
          <p className="text-[#8C5C38] font-body text-lg mb-10 text-left">
            Todo lo que necesitas saber antes de poner a la ardilla a trabajar en tu papeleo. 🐿️⚖️
          </p>
          
          <div className="w-full flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`bg-[#FAF9F6] rounded-[16px] border border-acorn-600/5 shadow-[0_1px_3px_0_rgba(10,30,15,0.02)] transition-colors duration-300 overflow-hidden ${
                    isOpen ? 'bg-white' : 'hover:bg-[#F2F4EB]'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className="font-sans font-medium text-lg text-moss-800 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-moss-600/5 text-moss-600 transition-transform duration-500">
                      <Plus 
                        className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                      />
                    </div>
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-slate-700 font-body leading-relaxed text-[15px] pt-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
