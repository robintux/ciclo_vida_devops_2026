import React, { useState } from 'react';
import { 
  Github, 
  Terminal, 
  Settings, 
  Cloud, 
  Bell, 
  LineChart, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Box, 
  Cpu, 
  AlertCircle,
  RefreshCcw
} from 'lucide-react';

const PipelineStep = ({ icon: Icon, title, tools, status, isActive, onClick, color }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 transform ${isActive ? 'scale-105' : 'hover:scale-102 opacity-70 hover:opacity-100'}`}
    >
      <div className={`p-5 rounded-2xl border ${isActive ? `border-${color}-500 bg-slate-900 shadow-lg shadow-${color}-500/20` : 'border-slate-800 bg-slate-900/50'} flex flex-col items-center gap-3 text-center min-w-[160px]`}>
        <div className={`p-3 rounded-xl ${isActive ? `bg-${color}-500/20 text-${color}-400` : 'bg-slate-800 text-slate-500'}`}>
          <Icon size={28} />
        </div>
        <div>
          <h3 className={`font-bold text-sm uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-500'}`}>{title}</h3>
          <p className="text-[10px] font-mono text-slate-400 mt-1">{status}</p>
        </div>
      </div>
      {isActive && (
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-${color}-500 rotate-45 rounded-sm`}></div>
      )}
    </div>
  );
};

const ToolBadge = ({ name }) => (
  <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-400 text-[10px] font-mono">
    {name}
  </span>
);

const App = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Codificar",
      icon: Github,
      status: "GIT_PUSH",
      color: "blue",
      details: {
        description: "El flujo comienza cuando el desarrollador sube cambios a una rama protegida.",
        commands: ["git push origin feature/analyzer"],
        tools: ["GitHub", "GitLab", "Bitbucket"],
        action: "Dispara el Webhook de CI"
      }
    },
    {
      id: 1,
      title: "CI (Integración)",
      icon: Settings,
      status: "TESTING",
      color: "purple",
      details: {
        description: "Se ejecutan pruebas automáticas y chequeos de calidad de forma inmediata.",
        commands: ["pytest test_sales_analyzer.py", "black --check .", "docker build -t sales-app ."],
        tools: ["Pytest", "Black", "Flake8", "Docker"],
        action: "Generación de artefacto Docker"
      }
    },
    {
      id: 2,
      title: "CD (Entrega)",
      icon: Cloud,
      status: "DEPLOYING",
      color: "emerald",
      details: {
        description: "Si los tests pasan, el software se despliega automáticamente en la nube.",
        commands: ["aws lambda update-function-code", "slack-notify --status success"],
        tools: ["AWS Lambda", "ECS", "Slack", "Terraform"],
        action: "Despliegue en Staging/Prod"
      }
    },
    {
      id: 3,
      title: "Monitoreo",
      icon: LineChart,
      status: "OBSERVING",
      color: "amber",
      details: {
        description: "Vigilancia activa del rendimiento y errores en tiempo real.",
        commands: ["prometheus_alert: latency > 5s", "datadog_dashboard: active"],
        tools: ["Prometheus", "Datadog", "Grafana"],
        action: "Detección de anomalías"
      }
    },
    {
      id: 4,
      title: "Feedback",
      icon: RefreshCcw,
      status: "LOOPBACK",
      color: "rose",
      details: {
        description: "El ciclo se cierra: un error reportado reinicia el proceso de desarrollo.",
        commands: ["PR Status: REOPENED", "Assignee: DevTeam"],
        tools: ["Jira", "GitHub Issues", "Sentry"],
        action: "Mejora continua"
      }
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3 mb-2 text-cyan-500">
            <Cpu size={20} />
            <span className="font-mono text-xs tracking-[0.3em]">AUTOMATED_PIPELINE_ENGINE</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Ciclo de Vida <span className="text-cyan-500">DevOps</span>
          </h1>
        </header>

        {/* Pipeline Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-16 overflow-x-auto pb-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <PipelineStep 
                {...step}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
              {index < steps.length - 1 && (
                <div className="hidden lg:block text-slate-700">
                  <ArrowRight size={24} className={activeStep > index ? 'text-cyan-500' : ''} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Detailed Console View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Info Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${current.color}-500/10 blur-3xl rounded-full`}></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl bg-${current.color}-500/10 text-${current.color}-400`}>
                <current.icon size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{current.title}</h2>
                <p className="text-slate-400">{current.details.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Herramientas & Tecnologías</h4>
                <div className="flex flex-wrap gap-2">
                  {current.details.tools.map(tool => (
                    <ToolBadge key={tool} name={tool} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 font-mono">
                <div className="flex items-center justify-between mb-3 text-[10px] text-slate-600">
                  <span>TERMINAL_OUTPUT</span>
                  <span className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </span>
                </div>
                {current.details.commands.map((cmd, i) => (
                  <div key={i} className="text-sm flex gap-3 mb-1">
                    <span className="text-slate-700 italic">$</span>
                    <span className="text-slate-300">{cmd}</span>
                  </div>
                ))}
                <div className="mt-4 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 size={12} />
                  <span>{current.details.action} [DONE]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Context Sidebar */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <AlertCircle size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Escenario Real</span>
            </div>
            
            {activeStep === 4 ? (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <p className="text-sm text-rose-200 leading-relaxed italic">
                  "Un usuario reporta error en el procesamiento de ventas. El monitor detecta latencia alta. El PR se reabre automáticamente para corregir el bug."
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                <p className="text-sm text-slate-400 leading-relaxed">
                  Haz clic en los pasos superiores para ver qué sucede en cada etapa del pipeline automatizado.
                </p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-500">PIPELINE_HEALTH</span>
                <span className="text-xs text-emerald-400 font-mono">98.4%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[98.4%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Mini Legend Footer */}
        <footer className="mt-12 text-center text-slate-600 text-[10px] font-mono tracking-widest uppercase">
          DevOps Pipeline Visualization // Build v2024.1 // Status: Running
        </footer>

      </div>
      
      <style>{`
        .scale-102:hover { transform: scale(1.02); }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-soft { animation: pulse-soft 3s infinite; }
      `}</style>
    </div>
  );
};

export default App;
