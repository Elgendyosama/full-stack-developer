import fs from 'fs';
import path from 'path';

const mockupsDir = path.resolve('./public/mockups');
if (!fs.existsSync(mockupsDir)) {
  fs.mkdirSync(mockupsDir, { recursive: true });
}

function makeNovaStoreSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <defs>
      <linearGradient id="novabg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="50%" stop-color="#1e1b4b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#a855f7"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="1200" height="2800" fill="url(#novabg)"/>
    
    <!-- Header -->
    <rect width="1200" height="80" fill="#0f172a" fill-opacity="0.8"/>
    <circle cx="80" cy="40" r="16" fill="url(#accent)"/>
    <text x="110" y="47" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="22">NovaStore</text>
    <text x="500" y="46" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">Products &nbsp;&nbsp;&nbsp; Categories &nbsp;&nbsp;&nbsp; Deals &nbsp;&nbsp;&nbsp; Brands &nbsp;&nbsp;&nbsp; Support</text>
    <rect x="1020" y="24" width="120" height="36" rx="18" fill="url(#accent)"/>
    <text x="1080" y="47" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="14" text-anchor="middle">Cart (3)</text>
    
    <!-- Hero Section -->
    <rect x="80" y="140" width="1040" height="420" rx="24" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="140" y="230" fill="#818cf8" font-family="system-ui, sans-serif" font-weight="600" font-size="16">NEXT-GEN ULTRA PERFORMANCE HEADLESS COMMERCE</text>
    <text x="140" y="300" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="46">Discover Luxury Sound &amp; Tech.</text>
    <text x="140" y="350" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="18">Engineered with Next.js 14, Algolia Search, and sub-100ms checkout times.</text>
    <rect x="140" y="400" width="180" height="52" rx="12" fill="url(#accent)"/>
    <text x="230" y="432" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="16" text-anchor="middle">Shop Collection</text>
    <rect x="340" y="400" width="160" height="52" rx="12" fill="none" stroke="#64748b" stroke-width="2"/>
    <text x="420" y="432" fill="#e2e8f0" font-family="system-ui, sans-serif" font-weight="600" font-size="16" text-anchor="middle">Watch Keynote</text>
    
    <!-- Hero Illustration / Mockup -->
    <rect x="740" y="190" width="320" height="320" rx="20" fill="#0f172a" stroke="#4f46e5" stroke-width="2"/>
    <circle cx="900" cy="350" r="100" fill="#6366f1" fill-opacity="0.2"/>
    <circle cx="900" cy="350" r="60" fill="url(#accent)"/>
    <text x="900" y="356" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="20" text-anchor="middle">50% OFF</text>
    
    <!-- Metrics Bar -->
    <rect x="80" y="600" width="1040" height="110" rx="16" fill="#111827"/>
    <text x="210" y="650" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="28" text-anchor="middle">99.98%</text>
    <text x="210" y="680" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Uptime SLA</text>
    <text x="470" y="650" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="28" text-anchor="middle">0.4s</text>
    <text x="470" y="680" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Average Page Load</text>
    <text x="730" y="650" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="28" text-anchor="middle">$14.2M</text>
    <text x="730" y="680" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Annual Volume</text>
    <text x="990" y="650" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="28" text-anchor="middle">4.9 / 5</text>
    <text x="990" y="680" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Customer Score</text>

    <!-- Product Grid Section -->
    <text x="80" y="780" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="32">Trending Best Sellers</text>
    <text x="80" y="815" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">Handcrafted audio monitors, wireless earbuds, and spatial acoustics.</text>

    <!-- 4 Product Cards Row 1 -->
    ${[0, 1, 2, 3].map(i => {
      const x = 80 + i * 270;
      const titles = ['Apex Studio Pro', 'Vortex Wireless X', 'Echo Pulse Pod', 'Zenith DAC Max'];
      const prices = ['$349.00', '$199.00', '$129.00', '$489.00'];
      return `
      <g transform="translate(${x}, 850)">
        <rect width="250" height="340" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <rect x="20" y="20" width="210" height="170" rx="12" fill="#0f172a"/>
        <circle cx="125" cy="105" r="45" fill="#6366f1" fill-opacity="0.3"/>
        <text x="20" y="225" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="16">${titles[i]}</text>
        <text x="20" y="250" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14">Spatial Hi-Fi Active</text>
        <text x="20" y="295" fill="#a855f7" font-family="system-ui, sans-serif" font-weight="700" font-size="20">${prices[i]}</text>
        <rect x="150" y="270" width="80" height="34" rx="8" fill="url(#accent)"/>
        <text x="190" y="292" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="12" text-anchor="middle">Add</text>
      </g>`;
    }).join('')}

    <!-- 4 Product Cards Row 2 -->
    ${[0, 1, 2, 3].map(i => {
      const x = 80 + i * 270;
      const titles = ['Nebula Soundbar 7.1', 'Titan Shield Case', 'Linear Amp Core', 'Wave XLR Mic'];
      const prices = ['$699.00', '$49.00', '$850.00', '$249.00'];
      return `
      <g transform="translate(${x}, 1220)">
        <rect width="250" height="340" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <rect x="20" y="20" width="210" height="170" rx="12" fill="#0f172a"/>
        <circle cx="125" cy="105" r="45" fill="#a855f7" fill-opacity="0.3"/>
        <text x="20" y="225" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="16">${titles[i]}</text>
        <text x="20" y="250" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14">Studio Grade Hardware</text>
        <text x="20" y="295" fill="#818cf8" font-family="system-ui, sans-serif" font-weight="700" font-size="20">${prices[i]}</text>
        <rect x="150" y="270" width="80" height="34" rx="8" fill="url(#accent)"/>
        <text x="190" y="292" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="12" text-anchor="middle">Add</text>
      </g>`;
    }).join('')}

    <!-- Features Banner -->
    <rect x="80" y="1610" width="1040" height="300" rx="20" fill="#131d33" stroke="#2a3b5c" stroke-width="1"/>
    <text x="140" y="1690" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="34">Why Audiophiles Choose Nova</text>
    <text x="140" y="1730" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">Bespoke dynamic drivers tuned by Grammy-winning mastering engineers.</text>
    <circle cx="160" cy="1800" r="20" fill="url(#accent)"/>
    <text x="200" y="1806" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="18">Zero Latency Wireless Codec</text>
    <circle cx="480" cy="1800" r="20" fill="url(#accent)"/>
    <text x="520" y="1806" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="18">60-Hour Battery Reserve</text>
    <circle cx="800" cy="1800" r="20" fill="url(#accent)"/>
    <text x="840" y="1806" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="18">Lifetime Warranty &amp; Care</text>

    <!-- Testimonials Section -->
    <text x="600" y="2000" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="32" text-anchor="middle">Loved by 120,000+ Creators Worldwide</text>
    <g transform="translate(80, 2050)">
      <rect width="330" height="200" rx="16" fill="#1e293b"/>
      <text x="30" y="50" fill="#f59e0b" font-size="18">★★★★★</text>
      <text x="30" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="15">"The soundstage is unreal. Nova replaced all my studio monitors."</text>
      <text x="30" y="150" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="16">Marcus Vance</text>
      <text x="30" y="170" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">Producer @ Sony Sound</text>
    </g>
    <g transform="translate(435, 2050)">
      <rect width="330" height="200" rx="16" fill="#1e293b"/>
      <text x="30" y="50" fill="#f59e0b" font-size="18">★★★★★</text>
      <text x="30" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="15">"Lightning fast delivery and the mobile app companion is pure joy."</text>
      <text x="30" y="150" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="16">Elena Rostova</text>
      <text x="30" y="170" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">Audio Engineer</text>
    </g>
    <g transform="translate(790, 2050)">
      <rect width="330" height="200" rx="16" fill="#1e293b"/>
      <text x="30" y="50" fill="#f59e0b" font-size="18">★★★★★</text>
      <text x="30" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="15">"Best e-commerce experience ever. Checkout was smooth as butter."</text>
      <text x="30" y="150" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="600" font-size="16">David Kim</text>
      <text x="30" y="170" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">Tech Reviewer</text>
    </g>

    <!-- Footer -->
    <rect x="0" y="2400" width="1200" height="400" fill="#090d16"/>
    <text x="80" y="2480" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="24">NovaStore Inc.</text>
    <text x="80" y="2515" fill="#64748b" font-family="system-ui, sans-serif" font-size="14">Empowering audiophiles and sound connoisseurs worldwide.</text>
    <text x="80" y="2600" fill="#475569" font-family="system-ui, sans-serif" font-size="14">© 2026 NovaStore Technologies. All rights reserved.</text>
    <text x="500" y="2480" fill="#cbd5e1" font-family="system-ui, sans-serif" font-weight="600" font-size="16">Shop</text>
    <text x="500" y="2520" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14">Headphones&#10;Monitors&#10;DAC Units&#10;Accessories</text>
    <text x="750" y="2480" fill="#cbd5e1" font-family="system-ui, sans-serif" font-weight="600" font-size="16">Support</text>
    <text x="750" y="2520" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14">Track Order&#10;Firmware&#10;Warranty&#10;Contact Us</text>
  </svg>`;
}

function makeSaaSSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <defs>
      <linearGradient id="apexbg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0b0f19"/>
        <stop offset="50%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#030712"/>
      </linearGradient>
      <linearGradient id="apexEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#06b6d4"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="2800" fill="url(#apexbg)"/>
    
    <!-- Navbar -->
    <rect width="1200" height="80" fill="#0b0f19" fill-opacity="0.9"/>
    <rect x="80" y="24" width="36" height="36" rx="8" fill="url(#apexEmerald)"/>
    <text x="130" y="48" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="22">ApexCloud</text>
    <text x="460" y="47" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="16">Platform &nbsp;&nbsp;&nbsp; Solutions &nbsp;&nbsp;&nbsp; Security &nbsp;&nbsp;&nbsp; Pricing &nbsp;&nbsp;&nbsp; Docs</text>
    <rect x="1000" y="24" width="120" height="36" rx="8" fill="url(#apexEmerald)"/>
    <text x="1060" y="47" fill="#0b0f19" font-family="system-ui, sans-serif" font-weight="700" font-size="14" text-anchor="middle">Start Free</text>
    
    <!-- Hero Banner -->
    <text x="600" y="190" fill="#10b981" font-family="system-ui, sans-serif" font-weight="600" font-size="16" text-anchor="middle">AUTOMATED CLOUD GOVERNANCE &amp; OBSERVABILITY</text>
    <text x="600" y="260" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="52" text-anchor="middle">Real-time Telemetry for Modern Devs</text>
    <text x="600" y="320" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle">Unify logs, traces, and Kubernetes clusters in single pane of glass.</text>
    
    <!-- App UI Mockup Hero -->
    <rect x="80" y="400" width="1040" height="520" rx="16" fill="#1f2937" stroke="#374151" stroke-width="2"/>
    <rect x="80" y="400" width="1040" height="40" rx="16" fill="#111827"/>
    <circle cx="110" cy="420" r="6" fill="#ef4444"/>
    <circle cx="130" cy="420" r="6" fill="#f59e0b"/>
    <circle cx="150" cy="420" r="6" fill="#10b981"/>
    <text x="600" y="425" fill="#6b7280" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">app.apexcloud.io/clusters/prod-eu-west-1/telemetry</text>
    
    <!-- Dashboard Inside Mockup -->
    <rect x="110" y="460" width="220" height="120" rx="10" fill="#111827"/>
    <text x="130" y="490" fill="#9ca3af" font-size="14">Global Latency</text>
    <text x="130" y="530" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="28">14.2 ms</text>
    <text x="130" y="560" fill="#059669" font-size="12">↓ 22% vs yesterday</text>
    
    <rect x="360" y="460" width="220" height="120" rx="10" fill="#111827"/>
    <text x="380" y="490" fill="#9ca3af" font-size="14">Error Rate</text>
    <text x="380" y="530" fill="#38bdf8" font-family="system-ui, sans-serif" font-weight="700" font-size="28">0.001%</text>
    <text x="380" y="560" fill="#0284c7" font-size="12">Zero dropouts</text>

    <rect x="610" y="460" width="480" height="120" rx="10" fill="#111827"/>
    <text x="630" y="490" fill="#9ca3af" font-size="14">Throughput (Req / sec)</text>
    <path d="M 640 540 Q 720 500 800 520 T 960 480 T 1060 510" fill="none" stroke="#10b981" stroke-width="4"/>

    <!-- Data Table Inside Mockup -->
    <rect x="110" y="610" width="980" height="280" rx="10" fill="#111827"/>
    <rect x="110" y="610" width="980" height="40" fill="#172133"/>
    <text x="130" y="635" fill="#94a3b8" font-weight="600" font-size="14">Service Name</text>
    <text x="380" y="635" fill="#94a3b8" font-weight="600" font-size="14">Cluster</text>
    <text x="600" y="635" fill="#94a3b8" font-weight="600" font-size="14">Status</text>
    <text x="850" y="635" fill="#94a3b8" font-weight="600" font-size="14">Pods</text>
    
    <text x="130" y="680" fill="#ffffff" font-size="14">api-gateway-v2</text>
    <text x="380" y="680" fill="#9ca3af" font-size="14">aws-us-east-1</text>
    <text x="600" y="680" fill="#10b981" font-weight="600" font-size="14">● HEALTHY</text>
    <text x="850" y="680" fill="#ffffff" font-size="14">18/18</text>

    <text x="130" y="725" fill="#ffffff" font-size="14">auth-broker-oauth</text>
    <text x="380" y="725" fill="#9ca3af" font-size="14">gcp-europe-west3</text>
    <text x="600" y="725" fill="#10b981" font-weight="600" font-size="14">● HEALTHY</text>
    <text x="850" y="725" fill="#ffffff" font-size="14">12/12</text>

    <text x="130" y="770" fill="#ffffff" font-size="14">billing-processor</text>
    <text x="380" y="770" fill="#9ca3af" font-size="14">aws-eu-central-1</text>
    <text x="600" y="770" fill="#10b981" font-weight="600" font-size="14">● HEALTHY</text>
    <text x="850" y="770" fill="#ffffff" font-size="14">8/8</text>

    <!-- Value Matrix -->
    <text x="600" y="1030" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="34" text-anchor="middle">Engineered for DevSecOps Teams</text>
    <g transform="translate(80, 1080)">
      <rect width="320" height="280" rx="16" fill="#1e293b"/>
      <rect x="24" y="24" width="48" height="48" rx="10" fill="url(#apexEmerald)"/>
      <text x="24" y="110" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="20">AI Root Cause Analysis</text>
      <text x="24" y="145" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="15">Detect anomalies across distributed microservices before alerts reach on-call.</text>
    </g>
    <g transform="translate(440, 1080)">
      <rect width="320" height="280" rx="16" fill="#1e293b"/>
      <rect x="24" y="24" width="48" height="48" rx="10" fill="url(#apexEmerald)"/>
      <text x="24" y="110" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="20">Zero-Config OpenTelemetry</text>
      <text x="24" y="145" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="15">Drop in our eBPF agent or Helm chart and start streaming traces in 60 seconds.</text>
    </g>
    <g transform="translate(800, 1080)">
      <rect width="320" height="280" rx="16" fill="#1e293b"/>
      <rect x="24" y="24" width="48" height="48" rx="10" fill="url(#apexEmerald)"/>
      <text x="24" y="110" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="20">SOC2 &amp; HIPAA Shield</text>
      <text x="24" y="145" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="15">Role-based granular access control, PII auto-masking, and audit logging.</text>
    </g>

    <!-- Pricing Section -->
    <text x="600" y="1480" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="34" text-anchor="middle">Transparent, Predictable Pricing</text>
    <g transform="translate(80, 1530)">
      <rect width="320" height="440" rx="16" fill="#111827" stroke="#374151" stroke-width="1"/>
      <text x="32" y="60" fill="#9ca3af" font-size="18" font-weight="600">Developer</text>
      <text x="32" y="110" fill="#ffffff" font-size="36" font-weight="800">$0 <tspan font-size="16" fill="#6b7280">/ mo</tspan></text>
      <text x="32" y="150" fill="#9ca3af" font-size="14">Up to 5 nodes &amp; 10GB telemetry</text>
      <rect x="32" y="340" width="256" height="44" rx="8" fill="#374151"/>
      <text x="160" y="367" fill="#ffffff" font-weight="600" text-anchor="middle">Start Free</text>
    </g>
    <g transform="translate(440, 1510)">
      <rect width="320" height="480" rx="16" fill="#1f2937" stroke="#10b981" stroke-width="2"/>
      <rect x="110" y="-12" width="100" height="24" rx="12" fill="#10b981"/>
      <text x="160" y="4" fill="#000000" font-size="11" font-weight="700" text-anchor="middle">MOST POPULAR</text>
      <text x="32" y="60" fill="#10b981" font-size="18" font-weight="600">Team Scale</text>
      <text x="32" y="110" fill="#ffffff" font-size="36" font-weight="800">$189 <tspan font-size="16" fill="#6b7280">/ mo</tspan></text>
      <text x="32" y="150" fill="#9ca3af" font-size="14">Up to 50 nodes &amp; 200GB telemetry</text>
      <rect x="32" y="380" width="256" height="44" rx="8" fill="url(#apexEmerald)"/>
      <text x="160" y="407" fill="#0b0f19" font-weight="700" text-anchor="middle">Deploy Now</text>
    </g>
    <g transform="translate(800, 1530)">
      <rect width="320" height="440" rx="16" fill="#111827" stroke="#374151" stroke-width="1"/>
      <text x="32" y="60" fill="#9ca3af" font-size="18" font-weight="600">Enterprise</text>
      <text x="32" y="110" fill="#ffffff" font-size="36" font-weight="800">Custom</text>
      <text x="32" y="150" fill="#9ca3af" font-size="14">Dedicated VPC, custom SLA &amp; SSO</text>
      <rect x="32" y="340" width="256" height="44" rx="8" fill="#374151"/>
      <text x="160" y="367" fill="#ffffff" font-weight="600" text-anchor="middle">Talk to Sales</text>
    </g>

    <!-- Footer -->
    <rect x="0" y="2400" width="1200" height="400" fill="#050811"/>
    <text x="80" y="2490" fill="#ffffff" font-size="22" font-weight="700">ApexCloud Observability</text>
    <text x="80" y="2530" fill="#6b7280" font-size="14">High-fidelity metrics and tracing infrastructure for distributed teams.</text>
  </svg>`;
}

function makeZetaPaySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <rect width="1200" height="2800" fill="#0a192f"/>
    <!-- Top Bar -->
    <rect width="1200" height="80" fill="#020c1b"/>
    <text x="80" y="48" fill="#64ffda" font-family="sans-serif" font-weight="800" font-size="24">ZETAPAY // ENTERPRISE</text>
    <text x="1000" y="47" fill="#ccd6f6" font-family="sans-serif" font-size="15">CLIENT LOGIN</text>
    <!-- Hero -->
    <text x="80" y="200" fill="#64ffda" font-size="16" font-family="monospace">01. GLOBAL PAYMENT RAILS</text>
    <text x="80" y="280" fill="#ccd6f6" font-size="52" font-weight="800" font-family="sans-serif">Multi-Currency Settlement</text>
    <text x="80" y="340" fill="#8892b0" font-size="22" font-family="sans-serif">Automated FX reconciliation and PCI-DSS Level 1 compliant gateway built on Laravel 11.</text>
    <!-- Stats Cards -->
    <g transform="translate(80, 420)">
      <rect width="320" height="160" rx="12" fill="#112240" stroke="#233554"/>
      <text x="24" y="50" fill="#8892b0" font-size="14">Daily Settlement Volume</text>
      <text x="24" y="100" fill="#64ffda" font-size="34" font-weight="700">$48,200,000</text>
      <text x="24" y="130" fill="#ccd6f6" font-size="13">180+ Supported Currencies</text>
    </g>
    <g transform="translate(440, 420)">
      <rect width="320" height="160" rx="12" fill="#112240" stroke="#233554"/>
      <text x="24" y="50" fill="#8892b0" font-size="14">API Response Latency</text>
      <text x="24" y="100" fill="#64ffda" font-size="34" font-weight="700">62 ms</text>
      <text x="24" y="130" fill="#ccd6f6" font-size="13">ISO-20022 Compliant</text>
    </g>
    <g transform="translate(800, 420)">
      <rect width="320" height="160" rx="12" fill="#112240" stroke="#233554"/>
      <text x="24" y="50" fill="#8892b0" font-size="14">Fraud Rejection Accuracy</text>
      <text x="24" y="100" fill="#64ffda" font-size="34" font-weight="700">99.94%</text>
      <text x="24" y="130" fill="#ccd6f6" font-size="13">Deep Learning Shield</text>
    </g>
    <!-- Corporate Features Grid -->
    <text x="80" y="700" fill="#ccd6f6" font-size="32" font-weight="700">Institutional Banking Features</text>
    ${[0, 1, 2, 3, 4, 5].map(i => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 80 + col * 360;
      const y = 760 + row * 220;
      const features = ['SEPA & SWIFT Direct', 'Automated Treasury Routing', 'Cryptographic Webhooks', 'Dispute Management API', 'Multi-tenant Org Roles', 'Real-time Ledgers'];
      return `
      <g transform="translate(${x}, ${y})">
        <rect width="330" height="180" rx="10" fill="#112240"/>
        <text x="20" y="45" fill="#64ffda" font-size="18" font-weight="700">0${i+1}. ${features[i]}</text>
        <text x="20" y="85" fill="#8892b0" font-size="14">Built for tier-1 financial institutions with zero tolerance for downtime or balance discrepancies.</text>
      </g>`;
    }).join('')}
    <!-- Compliance Logos -->
    <rect x="80" y="1300" width="1040" height="200" rx="16" fill="#112240"/>
    <text x="600" y="1360" fill="#ccd6f6" font-size="22" font-weight="700" text-anchor="middle">Global Banking Certifications</text>
    <text x="200" y="1430" fill="#64ffda" font-size="18" font-weight="600" text-anchor="middle">PCI-DSS Level 1</text>
    <text x="470" y="1430" fill="#64ffda" font-size="18" font-weight="600" text-anchor="middle">SOC2 Type II</text>
    <text x="730" y="1430" fill="#64ffda" font-size="18" font-weight="600" text-anchor="middle">FCA Regulated</text>
    <text x="990" y="1430" fill="#64ffda" font-size="18" font-weight="600" text-anchor="middle">GDPR Validated</text>
    <!-- Footer -->
    <rect x="0" y="2400" width="1200" height="400" fill="#020c1b"/>
    <text x="80" y="2490" fill="#ccd6f6" font-size="20" font-weight="700">ZetaPay Institutional Corp.</text>
    <text x="80" y="2530" fill="#8892b0" font-size="14">Enterprise payment routing engine for cross-border global trade.</text>
  </svg>`;
}

function makeArtisanWoodSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <rect width="1200" height="2800" fill="#1c1917"/>
    <!-- Top Bar -->
    <rect width="1200" height="80" fill="#292524"/>
    <text x="80" y="48" fill="#e7e5e4" font-family="serif" font-weight="700" font-size="24">ARTISAN &amp; OAK</text>
    <text x="500" y="46" fill="#a8a29e" font-family="sans-serif" font-size="15">Dining Tables &nbsp; Chairs &nbsp; Custom Desks &nbsp; Heritage Timber &nbsp; Journal</text>
    <!-- Hero -->
    <rect x="80" y="120" width="1040" height="480" rx="16" fill="#44403c"/>
    <text x="140" y="220" fill="#d97706" font-size="16" font-weight="700" font-family="sans-serif">SUSTAINABLY HARVESTED WALNUT &amp; WHITE OAK</text>
    <text x="140" y="300" fill="#fafaf9" font-size="48" font-weight="800" font-family="serif">Handcrafted Furniture for Generations</text>
    <text x="140" y="360" fill="#d6d3d1" font-size="18" font-family="sans-serif">Custom commissioned dining tables, solid wood credenzas, and heirloom joinery.</text>
    <rect x="140" y="420" width="200" height="48" rx="8" fill="#d97706"/>
    <text x="240" y="450" fill="#ffffff" font-size="16" font-weight="700" text-anchor="middle">Explore Catalog</text>
    <!-- Product Showcase -->
    <text x="80" y="680" fill="#fafaf9" font-size="32" font-family="serif">Featured Heirloom Pieces</text>
    ${[0, 1, 2, 3].map(i => {
      const x = 80 + i * 270;
      const titles = ['Kyoto Walnut Table', 'Oslo Credenza', 'Sierra Armchair', 'Highland Bookcase'];
      const prices = ['$3,200', '$2,450', '$890', '$1,850'];
      return `
      <g transform="translate(${x}, 730)">
        <rect width="250" height="340" rx="12" fill="#292524"/>
        <rect x="20" y="20" width="210" height="180" rx="8" fill="#44403c"/>
        <text x="20" y="235" fill="#fafaf9" font-size="17" font-weight="700" font-family="serif">${titles[i]}</text>
        <text x="20" y="265" fill="#a8a29e" font-size="13">Solid Black Walnut</text>
        <text x="20" y="305" fill="#d97706" font-size="20" font-weight="700">${prices[i]}</text>
      </g>`;
    }).join('')}
    <!-- Story -->
    <rect x="80" y="1150" width="1040" height="360" rx="16" fill="#292524"/>
    <text x="140" y="1240" fill="#fafaf9" font-size="34" font-weight="700" font-family="serif">Traditional Japanese Joinery</text>
    <text x="140" y="1290" fill="#d6d3d1" font-size="17">Zero nails, zero synthetic veneers. Every mortise and tenon joint is hand chiseled by master carpenters with 20+ years of timber mastery.</text>
    <!-- Footer -->
    <rect x="0" y="2400" width="1200" height="400" fill="#141210"/>
    <text x="80" y="2490" fill="#fafaf9" font-size="22" font-family="serif">Artisan &amp; Oak Woodworks</text>
    <text x="80" y="2530" fill="#78716c" font-size="14">WooCommerce + Next.js Headless Experience.</text>
  </svg>`;
}

function makePulseFitSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <rect width="1200" height="2800" fill="#09090b"/>
    <rect width="1200" height="80" fill="#18181b"/>
    <text x="80" y="48" fill="#f43f5e" font-family="sans-serif" font-weight="900" font-size="24">PULSE.FIT</text>
    <text x="1000" y="48" fill="#ffffff" font-family="sans-serif" font-weight="700" font-size="15">DOWNLOAD APP</text>
    <!-- Hero -->
    <text x="600" y="180" fill="#f43f5e" font-size="16" font-weight="800" text-anchor="middle">AI-POWERED HYPERTROPHY &amp; METABOLIC COACHING</text>
    <text x="600" y="260" fill="#ffffff" font-size="56" font-weight="900" text-anchor="middle">Transform Your Physique.</text>
    <text x="600" y="320" fill="#a1a1aa" font-size="20" text-anchor="middle">Adaptive workout progression based on daily bio-feedback and wearable sync.</text>
    <!-- App Preview Mockup -->
    <rect x="250" y="400" width="700" height="600" rx="24" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
    <rect x="280" y="440" width="640" height="80" rx="12" fill="#27272a"/>
    <text x="310" y="485" fill="#ffffff" font-size="18" font-weight="700">Today: Chest &amp; Triceps Hypertrophy (Day 42)</text>
    <rect x="280" y="550" width="300" height="160" rx="12" fill="#27272a"/>
    <text x="310" y="590" fill="#a1a1aa" font-size="14">Weekly Volume</text>
    <text x="310" y="640" fill="#f43f5e" font-size="36" font-weight="800">42,500 kg</text>
    <rect x="620" y="550" width="300" height="160" rx="12" fill="#27272a"/>
    <text x="650" y="590" fill="#a1a1aa" font-size="14">Recovery Index</text>
    <text x="650" y="640" fill="#10b981" font-size="36" font-weight="800">96 / 100</text>
    <!-- Membership Grid -->
    <text x="600" y="1120" fill="#ffffff" font-size="34" font-weight="800" text-anchor="middle">Choose Your Transformation Plan</text>
    <g transform="translate(180, 1180)">
      <rect width="400" height="340" rx="16" fill="#18181b" stroke="#3f3f46"/>
      <text x="40" y="60" fill="#a1a1aa" font-size="18">Pro Athlete</text>
      <text x="40" y="110" fill="#ffffff" font-size="42" font-weight="900">$29 <tspan font-size="16" fill="#71717a">/ mo</tspan></text>
      <text x="40" y="160" fill="#e4e4e7" font-size="15">✓ AI periodization engine</text>
      <text x="40" y="195" fill="#e4e4e7" font-size="15">✓ Apple Health &amp; Whoop sync</text>
    </g>
    <g transform="translate(620, 1180)">
      <rect width="400" height="340" rx="16" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
      <text x="40" y="60" fill="#f43f5e" font-size="18" font-weight="700">VIP 1-on-1 Coaching</text>
      <text x="40" y="110" fill="#ffffff" font-size="42" font-weight="900">$149 <tspan font-size="16" fill="#71717a">/ mo</tspan></text>
      <text x="40" y="160" fill="#e4e4e7" font-size="15">✓ Everything in Pro</text>
      <text x="40" y="195" fill="#e4e4e7" font-size="15">✓ Dedicated Olympic Trainer Chat</text>
    </g>
    <!-- Footer -->
    <rect x="0" y="2400" width="1200" height="400" fill="#09090b"/>
    <text x="80" y="2490" fill="#ffffff" font-size="22" font-weight="700">PulseFit Mobile Ecosystem</text>
  </svg>`;
}

function makeOmniLogisticsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <rect width="1200" height="2800" fill="#0f172a"/>
    <rect width="1200" height="80" fill="#1e293b"/>
    <text x="80" y="48" fill="#38bdf8" font-family="sans-serif" font-weight="800" font-size="24">OMNILOGISTICS</text>
    <text x="500" y="47" fill="#94a3b8" font-size="15">Fleet &nbsp; Dispatch &nbsp; Telematics &nbsp; Customs &nbsp; Analytics</text>
    <!-- Map & Fleet Monitor -->
    <text x="80" y="160" fill="#38bdf8" font-size="15" font-weight="700">INTELLIGENT SUPPLY CHAIN MANAGEMENT</text>
    <text x="80" y="230" fill="#ffffff" font-size="48" font-weight="800">Autonomous Freight Dispatch &amp; Route AI</text>
    <rect x="80" y="280" width="1040" height="500" rx="16" fill="#1e293b"/>
    <text x="120" y="330" fill="#ffffff" font-size="20" font-weight="700">Active North America Fleet Live Tracking</text>
    <!-- Radar Grid / Nodes -->
    <circle cx="300" cy="520" r="12" fill="#22c55e"/>
    <text x="325" y="525" fill="#ffffff" font-size="14">Truck #842 - Chicago → Dallas</text>
    <circle cx="650" cy="460" r="12" fill="#22c55e"/>
    <text x="675" y="465" fill="#ffffff" font-size="14">Vessel #19 - Rotterdam → NY</text>
    <circle cx="850" cy="620" r="12" fill="#eab308"/>
    <text x="875" y="625" fill="#ffffff" font-size="14">Flight #902 - Customs Hold</text>
    <!-- Metrics -->
    <g transform="translate(80, 820)">
      <rect width="240" height="120" rx="12" fill="#1e293b"/>
      <text x="20" y="40" fill="#94a3b8" font-size="13">Active Shipments</text>
      <text x="20" y="85" fill="#38bdf8" font-size="32" font-weight="800">4,819</text>
    </g>
    <g transform="translate(345, 820)">
      <rect width="240" height="120" rx="12" fill="#1e293b"/>
      <text x="20" y="40" fill="#94a3b8" font-size="13">On-Time Rate</text>
      <text x="20" y="85" fill="#22c55e" font-size="32" font-weight="800">99.1%</text>
    </g>
    <g transform="translate(610, 820)">
      <rect width="240" height="120" rx="12" fill="#1e293b"/>
      <text x="20" y="40" fill="#94a3b8" font-size="13">CO2 Offset (Tons)</text>
      <text x="20" y="85" fill="#a855f7" font-size="32" font-weight="800">12,450</text>
    </g>
    <g transform="translate(875, 820)">
      <rect width="240" height="120" rx="12" fill="#1e293b"/>
      <text x="20" y="40" fill="#94a3b8" font-size="13">Fuel Savings</text>
      <text x="20" y="85" fill="#f59e0b" font-size="32" font-weight="800">$1.8M</text>
    </g>
    <!-- Footer -->
    <rect x="0" y="2400" width="1200" height="400" fill="#0b1120"/>
    <text x="80" y="2490" fill="#ffffff" font-size="22" font-weight="700">OmniLogistics Systems</text>
  </svg>`;
}

function makeVerdeArchSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <rect width="1200" height="2800" fill="#18181b"/>
    <rect width="1200" height="80" fill="#09090b"/>
    <text x="80" y="48" fill="#e4e4e7" font-family="serif" font-size="24" letter-spacing="4">VERDE ARCHITECTS</text>
    <text x="700" y="46" fill="#a1a1aa" font-size="14" letter-spacing="2">PROJECTS &nbsp; PHILOSOPHY &nbsp; MONOGRAPHS &nbsp; CONTACT</text>
    <!-- Hero -->
    <rect x="80" y="140" width="1040" height="520" fill="#27272a"/>
    <text x="140" y="260" fill="#a1a1aa" font-size="14" letter-spacing="3">SUSTAINABLE MONUMENTAL ARCHITECTURE</text>
    <text x="140" y="340" fill="#ffffff" font-size="52" font-family="serif">Biophilic Glass &amp; Basalt Pavilions</text>
    <text x="140" y="400" fill="#d4d4d8" font-size="18">Pritzker Prize nominated studio crafting zero-carbon civic centers in Oslo, Zurich, and Kyoto.</text>
    <!-- Masonry Works -->
    <text x="80" y="740" fill="#ffffff" font-size="30" font-family="serif">Selected Monograph 2024–2026</text>
    <g transform="translate(80, 800)">
      <rect width="500" height="380" fill="#27272a"/>
      <text x="30" y="340" fill="#ffffff" font-family="serif" font-size="22">Nordic Horizon Library</text>
      <text x="30" y="365" fill="#a1a1aa" font-size="13">Oslo, Norway • 24,000 sqm</text>
    </g>
    <g transform="translate(620, 800)">
      <rect width="500" height="380" fill="#27272a"/>
      <text x="30" y="340" fill="#ffffff" font-family="serif" font-size="22">Zenith Alpine Sanctuary</text>
      <text x="30" y="365" fill="#a1a1aa" font-size="13">Zermatt, Switzerland • 6,500 sqm</text>
    </g>
    <rect x="0" y="2400" width="1200" height="400" fill="#09090b"/>
    <text x="80" y="2490" fill="#ffffff" font-family="serif" font-size="22">Verde Architecture Partners</text>
  </svg>`;
}

function makeAuraCosmeticsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 2800" width="1200" height="2800">
    <rect width="1200" height="2800" fill="#fff1f2"/>
    <rect width="1200" height="80" fill="#ffe4e6"/>
    <text x="80" y="48" fill="#be123c" font-family="serif" font-weight="700" font-size="24">AURA BOTANICALS</text>
    <text x="500" y="46" fill="#881337" font-size="15">Serums &nbsp; Moisture Veil &nbsp; Clinical Results &nbsp; Press</text>
    <rect x="80" y="140" width="1040" height="460" rx="20" fill="#fecdd3"/>
    <text x="140" y="240" fill="#be123c" font-size="15" font-weight="700">CLINICAL HYDRATION WITH BOTANICAL STEM CELLS</text>
    <text x="140" y="320" fill="#881337" font-size="52" font-family="serif" font-weight="800">Restore Your Radiant Glow</text>
    <text x="140" y="375" fill="#9f1239" font-size="18">Patented multi-weight hyaluronic peptides delivering 72-hour moisture lock.</text>
    <rect x="140" y="420" width="220" height="50" rx="25" fill="#be123c"/>
    <text x="250" y="452" fill="#ffffff" font-size="16" font-weight="700" text-anchor="middle">Shop Ritual Now</text>
    <!-- Product Row -->
    <text x="80" y="680" fill="#881337" font-size="32" font-family="serif">The Signature Trio</text>
    ${[0, 1, 2].map(i => {
      const x = 80 + i * 360;
      const titles = ['Cellular Rose Elixir', 'Ceramide Cloud Barrier', 'Luminous Eye Nectar'];
      const prices = ['$88', '$72', '$64'];
      return `
      <g transform="translate(${x}, 730)">
        <rect width="330" height="380" rx="16" fill="#ffffff" stroke="#fecdd3"/>
        <rect x="25" y="25" width="280" height="200" rx="12" fill="#fff1f2"/>
        <text x="25" y="260" fill="#881337" font-family="serif" font-size="20" font-weight="700">${titles[i]}</text>
        <text x="25" y="290" fill="#9f1239" font-size="14">30ml / 1.0 fl oz</text>
        <text x="25" y="335" fill="#be123c" font-size="22" font-weight="800">${prices[i]}</text>
      </g>`;
    }).join('')}
    <rect x="0" y="2400" width="1200" height="400" fill="#4c0519"/>
    <text x="80" y="2490" fill="#ffffff" font-size="22" font-family="serif">Aura Botanicals Paris</text>
  </svg>`;
}

fs.writeFileSync(path.join(mockupsDir, 'nova-store.svg'), makeNovaStoreSvg());
fs.writeFileSync(path.join(mockupsDir, 'apex-saas.svg'), makeSaaSSvg());
fs.writeFileSync(path.join(mockupsDir, 'zetapay.svg'), makeZetaPaySvg());
fs.writeFileSync(path.join(mockupsDir, 'artisan-wood.svg'), makeArtisanWoodSvg());
fs.writeFileSync(path.join(mockupsDir, 'pulsefit.svg'), makePulseFitSvg());
fs.writeFileSync(path.join(mockupsDir, 'omnilogistics.svg'), makeOmniLogisticsSvg());
fs.writeFileSync(path.join(mockupsDir, 'verde-arch.svg'), makeVerdeArchSvg());
fs.writeFileSync(path.join(mockupsDir, 'aura-cosmetics.svg'), makeAuraCosmeticsSvg());

console.log('Successfully generated 8 high-res mockup SVGs in public/mockups!');

