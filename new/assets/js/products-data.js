(function () {
  const REVERB_STORE_URL = "https://reverb.com/shop/dede-korkuts-gear-garage";

  const modernProducts = [
    {
      slug: "ferromagnetic",
      name: "Ferromagnetic",
      line: "dsp",
      category: "Multi Head Tape Delay",
      shortDescription: "Multi Head Tape Delay with tape-machine style controls.",
      features: [
        "2 tape machine modes: Fixed Head & Multi Head",
        "3 playback heads (A/B/C) + selectable head combinations in Multi mode",
        "Time/Speed affects delay time and repeat brightness/darkness",
        "Tape Age controls bandwidth/'age' character (clean -> worn)",
        "Head Distance changes playback head distance without changing motor speed (time changes while bandwidth character stays)",
        "Max delay times: Head A 2000ms, Head B 1500ms, Head C 667ms"
      ],
      controls: [],
      specs: [],
      images: [
        "https://www.dedekorkutpedal.com/assets/images/ferromagnetic-14-877x800.jpg",
        "https://www.dedekorkutpedal.com/assets/images/ferromagnetic-5-780x780.jpg"
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Ferromagnetic: Multi Head Tape Delay with tape-machine style controls, Fixed/Multi modes, 3 playback heads, and up to 2000ms delay."
    },
    {
      slug: "reverberant",
      name: "Reverberant",
      line: "dsp",
      category: "Multi Space Reverb",
      shortDescription: "Multi Space Reverb with 6 reverb types (2 banks).",
      features: [
        "Bank A: Hall, Plate, Spring",
        "Bank B: Large Hall, Room, Shimmer",
        "Controls: Decay, Pre-Delay (also shimmer level in Shimmer mode), Tone, Space, Mix",
        "Mix: 0% dry / 100% wet range"
      ],
      controls: ["Decay", "Pre-Delay", "Tone", "Space", "Mix"],
      specs: [],
      images: [
        "https://www.dedekorkutpedal.com/assets/images/reverberant-780x780.jpg"
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Reverberant Multi Space Reverb with 6 reverb types across two banks plus Decay, Pre-Delay, Tone, Space, and Mix controls."
    },
    {
      slug: "dynamictremolo",
      name: "Dynamic Tremolo",
      line: "dsp",
      category: "Touch Sensitive Tremolo + Reverb",
      shortDescription: "Touch-sensitive tremolo with selectable wave shapes and built-in reverb.",
      features: [
        "Dynamic Intensity mode: playing harder increases trem depth",
        "Dynamic Speed mode: playing harder increases trem rate",
        "Wave shapes: Sine, Saw, Square"
      ],
      controls: ["Intensity", "Speed", "Reverb", "Space", "Volume"],
      specs: [
        "True bypass",
        "9V negative-center standard supply",
        "Mono in/out"
      ],
      images: [
        "https://www.dedekorkutpedal.com/assets/images/dynamictremolo-780x780.jpg"
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Dynamic Tremolo: touch-sensitive tremolo with Sine/Saw/Square waves, dynamic modes, built-in reverb, and 9V true-bypass operation."
    },
    {
      slug: "crowdedchorus",
      name: "Crowded Chorus",
      line: "dsp",
      category: "Dynamic Chorus & Vibrato",
      shortDescription: "Dynamic chorus and vibrato.",
      features: [
        "Visible controls/switch labels from product photo"
      ],
      controls: ["Depth", "Speed", "Tone", "Space", "Mix"],
      toggles: ["Single/Multi/Vibrato", "Normal/Dynamic"],
      specs: [],
      images: [
        "https://www.dedekorkutpedal.com/assets/images/crowdedchorus-780x780.jpg"
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Crowded Chorus: dynamic chorus and vibrato with Depth, Speed, Tone, Space, Mix and Single/Multi/Vibrato plus Normal/Dynamic toggles."
    },
    {
      slug: "manyphasedgod",
      name: "Many-Phased God",
      line: "dsp",
      category: "Phaser",
      shortDescription: "Phaser of all times.",
      features: [
        "Visible controls/switch labels from product photo"
      ],
      controls: ["Depth", "Speed", "Feedback", "Space", "Volume"],
      toggles: ["Vintage/Classic/Multi 8", "Normal/Dynamic"],
      specs: [],
      images: [
        "https://www.dedekorkutpedal.com/assets/images/manyphasedgod-780x780.jpg"
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Many-Phased God phaser with Depth, Speed, Feedback, Space, Volume and Vintage/Classic/Multi 8 plus Normal/Dynamic toggle modes."
    }
  ];

  const legacyProducts = [
    {
      slug: "deli-dumrul",
      name: "Deli Dumrul",
      category: "High Gain Distortion",
      status: "Legacy / Archived",
      description: "Early-era handmade analog pedal line (limited/older production).",
      videoUrl: ""
    },
    {
      slug: "1513",
      name: "1513",
      category: "Legacy model",
      status: "Legacy / Archived",
      description: "Early-era handmade analog pedal line (limited/older production).",
      videoUrl: ""
    },
    {
      slug: "nemrut",
      name: "Nemrut",
      category: "Distortion",
      status: "Legacy / Archived",
      description: "Early-era handmade analog pedal line (limited/older production).",
      videoUrl: ""
    }
  ];

  window.DK_PRODUCTS = {
    brand: {
      name: "Dede Korkut Pedal",
      statement: "Turkey-based builder focused on DSP guitar pedals, rooted in early handmade analog designs.",
      reverbStoreUrl: REVERB_STORE_URL
    },
    modernProducts,
    legacyProducts
  };
})();
