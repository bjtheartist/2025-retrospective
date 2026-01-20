import { SectorData } from './types';

export const SECTORS: SectorData[] = [
  {
    id: 'intro',
    type: 'analysis',
    title: 'The Year of Pragmatic Power',
    shortTitle: 'Overview',
    overview: "The year 2025 will be remembered as the moment Chicago decoupled from the coastal narrative. While Silicon Valley recalibrated, the Windy City capitalized on its industrial heritage, merging deep tech with deep roots. From the autonomous freight corridors of the I-55 to the quantum trading desks of the Loop, Chicago has forged a new model of venture capital—one defined not by hype, but by tangible, revenue-driven resilience. This retrospective analyzes the numbers, the deals, and the structural shifts that defined a landmark year.",
    stats: [
      { label: 'Total VC Invested', value: '$12.4bn', trend: 'up', trendValue: '+18% YoY' },
      { label: 'Unicorn Births', value: '7', trend: 'up', trendValue: 'Record High' },
      { label: 'Exit Value', value: '$8.1bn', trend: 'stable', trendValue: 'Solid' },
    ],
    chartData: [
      { year: '2020', value: 2.8 },
      { year: '2021', value: 7.2 },
      { year: '2022', value: 5.5 },
      { year: '2023', value: 6.1 },
      { year: '2024', value: 10.5 },
      { year: '2025', value: 12.4 },
    ],
    chartLabel: 'Capital Invested ($bn)',
    startups: [],
    insights: "The 'Chicago Model' of revenue-first growth is now the national standard.",
    futureTrend: "Cross-sector fusion (e.g., Bio-Ag, Fin-Logistics) will define 2026.",
    // Chicago Skyline at Night / General City
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop',
  },
  {
    id: 'fintech',
    type: 'analysis',
    title: 'Fintech: Beyond Payments',
    shortTitle: 'Fintech',
    overview: "Chicago's Fintech sector has matured beyond trading algorithms. 2025 sees a surge in embedded finance for legacy industries and blockchain applications for supply chain transparency.",
    stats: [
      { label: 'Market Share', value: '14%', trend: 'up', trendValue: 'of US Fintech' },
      { label: 'Avg Deal Size', value: '$22m', trend: 'up', trendValue: 'Series B+' },
    ],
    chartData: [
      { year: '2020', value: 1.1 },
      { year: '2021', value: 2.3 },
      { year: '2022', value: 1.8 },
      { year: '2023', value: 2.1 },
      { year: '2024', value: 3.4 },
      { year: '2025', value: 4.2 },
    ],
    chartLabel: 'Capital Deployed ($bn)',
    startups: [
      { name: 'LedgerLoop', description: 'Blockchain for industrial supply chains', funding: '$85M Series C' },
      { name: 'SuretyAI', description: 'Predictive insurance for manufacturing', funding: '$40M Series B' },
    ],
    insights: "Institutional adoption of DeFi protocols is driven by Chicago's trading firms.",
    futureTrend: "Quantum financial modeling will begin pilot phases in late 2025.",
    // Chicago Loop / Architecture (implies finance)
    image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 'editorial-1',
    type: 'editorial',
    title: 'The Great Convergence',
    shortTitle: 'Convergence',
    overview: "For decades, specific sectors operated in silos. Finance was on LaSalle Street; Logistics was in the railyards; Agriculture was at the Board of Trade. <br/><br/> In 2025, those lines have <strong>completely dissolved</strong>. <br/><br/> We are witnessing a <em>Great Convergence</em> where the most valuable startups are those that exist in the undefined spaces between industries. It is no longer just about moving money or moving goods—it is about the <strong>financialization of logistics</strong> and the <strong>digitization of biological assets</strong>.",
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop', // Abstract building intersection
  },
  {
    id: 'logistics',
    type: 'analysis',
    title: 'Logistics: The Global Nexus',
    shortTitle: 'Logistics',
    overview: "Building on its historical strength, Chicago's logistics tech has moved into autonomous freight orchestration and green supply chains. The I-55 corridor is now a testbed for autonomous trucking.",
    stats: [
      { label: 'Sector Growth', value: '22%', trend: 'up', trendValue: 'CAGR' },
      { label: 'Carbon Reduced', value: '1.2m', trend: 'up', trendValue: 'Tons (est)' },
    ],
    chartData: [
      { year: '2020', value: 0.8 },
      { year: '2021', value: 1.5 },
      { year: '2022', value: 1.2 },
      { year: '2023', value: 2.8 },
      { year: '2024', value: 3.9 },
      { year: '2025', value: 5.1 },
    ],
    chartLabel: 'Valuation Index',
    startups: [
      { name: 'RouteMind', description: 'AI-driven freight brokerage', funding: '$120M Series D' },
      { name: 'GreenMile', description: 'EV fleet management platform', funding: '$55M Series B' },
    ],
    insights: "Legacy carriers are acquiring tech startups at a record pace to stay competitive.",
    futureTrend: "Vertical integration of warehousing robotics and delivery drones.",
    // Chicago L Train / Transit
    image: 'https://images.unsplash.com/photo-1596236560934-8c8f5f1c990c?q=80&w=2574&auto=format&fit=crop',
  },
  {
    id: 'healthcare',
    type: 'analysis',
    title: 'Healthcare & Life Sciences',
    shortTitle: 'Healthcare',
    overview: "With the expansion of the Fulton Market innovation district, Life Sciences have exploded. 2025 marks the year Chicago overtook Boston in growth rate for biotech startups.",
    stats: [
      { label: 'Lab Space', value: '3.5m', trend: 'up', trendValue: 'Sq Ft Added' },
      { label: 'FDA Approvals', value: '12', trend: 'up', trendValue: 'New Therapeutics' },
    ],
    chartData: [
      { year: '2020', value: 0.5 },
      { year: '2021', value: 1.1 },
      { year: '2022', value: 1.5 },
      { year: '2023', value: 2.0 },
      { year: '2024', value: 2.8 },
      { year: '2025', value: 3.5 },
    ],
    chartLabel: 'Sector Funding ($bn)',
    startups: [
      { name: 'NanoCure', description: 'Targeted drug delivery systems', funding: '$200M Series C' },
      { name: 'HealthBridge', description: 'Interoperability for rural hospitals', funding: '$30M Series A' },
    ],
    insights: "Universities (Northwestern, UChicago) are spinning out startups faster than ever.",
    futureTrend: "AI-driven drug discovery will reduce time-to-market by 40%.",
    // Modern Lab / Tech building (Abstract representation of Fulton Market labs)
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2680&auto=format&fit=crop',
  },
  {
    id: 'food',
    type: 'analysis',
    title: 'Food, Ag & Beverage',
    shortTitle: 'Food/Ag',
    overview: "As the Silicon Valley of Food, Chicago is pioneering fermentation-based proteins and precision agriculture. The ecosystem connects deep rural roots with urban food tech.",
    stats: [
      { label: 'Alt-Protein', value: '$850m', trend: 'up', trendValue: 'Invested' },
      { label: 'Corp Partners', value: '15', trend: 'stable', trendValue: 'Fortune 500s' },
    ],
    chartData: [
      { year: '2020', value: 100 },
      { year: '2021', value: 140 },
      { year: '2022', value: 130 },
      { year: '2023', value: 180 },
      { year: '2024', value: 240 },
      { year: '2025', value: 310 },
    ],
    chartLabel: 'Deal Volume (#)',
    startups: [
      { name: 'FermLabs', description: 'Precision fermentation at scale', funding: '$90M Series B' },
      { name: 'CropLens', description: 'Satellite hydration monitoring', funding: '$15M Seed' },
    ],
    insights: "Big CPG companies are no longer just acquirers; they are active venture partners.",
    futureTrend: "Hyper-localized vertical farming integrated into retail supply chains.",
    // Urban setting or Greenery (Lincoln Park Conservatory vibe)
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2646&auto=format&fit=crop',
  },
  {
    id: 'editorial-2',
    type: 'editorial',
    title: 'The Human Element',
    shortTitle: 'Talent',
    overview: "Robots build the cars. Algorithms trade the stocks. But the story of 2025 is fundamentally about the <strong>return of the builder</strong>. <br/><br/> Chicago has reversed the 'brain drain' of the 2010s. The cost-of-living arbitrage, combined with a pragmatic culture that values <strong>revenue over rhetoric</strong>, has attracted a record number of engineers and founders leaving the coasts. They didn't come for the weather—they came for the <strong>work</strong>.",
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop', // Office / People / Collaboration
  },
  {
    id: 'manufacturing',
    type: 'analysis',
    title: 'Advanced Manufacturing',
    shortTitle: 'Mfg',
    overview: "Industry 5.0 has arrived. Chicago's rust belt heritage is its greatest asset as it transitions to smart manufacturing, robotics, and industrial IoT.",
    stats: [
      { label: 'Robotics adoption', value: '45%', trend: 'up', trendValue: 'of SMEs' },
      { label: 'Efficiency Gain', value: '30%', trend: 'up', trendValue: 'Avg via IoT' },
    ],
    chartData: [
      { year: '2020', value: 1.5 },
      { year: '2021', value: 1.8 },
      { year: '2022', value: 1.6 },
      { year: '2023', value: 2.2 },
      { year: '2024', value: 3.0 },
      { year: '2025', value: 4.5 },
    ],
    chartLabel: 'Investment Volume ($bn)',
    startups: [
      { name: 'CobotIX', description: 'Collaborative robots for assembly', funding: '$65M Series B' },
      { name: 'SensorMesh', description: 'Wireless industrial sensor arrays', funding: '$25M Series A' },
    ],
    insights: "Reshoring efforts have driven massive demand for automation technology.",
    futureTrend: "Dark factories (fully autonomous) will become common for commodity parts.",
    // Industrial Bridge / Steel structures (Chicago River bridges)
    image: 'https://images.unsplash.com/photo-1505236273191-1dce886b01e9?q=80&w=2670&auto=format&fit=crop',
  },
];