(function () {
  const REVERB_STORE_URL = "https://reverb.com/shop/dede-korkuts-gear-garage";

  const modernProducts = [
    {
      slug: "ferromagnetic",
      name: "Ferromagnetic",
      line: "dsp",
      category: "Multi Head Tape Delay",
      shortDescription: "A tape-inspired delay with practical head control, deep repeats, and a strong studio-to-stage workflow.",
      features: [
        "Switch between Fixed Head and Multi Head tape machine behavior.",
        "Blend three playback heads into rhythmic repeat patterns without menu diving.",
        "Shape both timing and tone from clean, articulate repeats to worn, darker textures.",
        "Adjust head distance independently for musical movement without losing the core tape character.",
        "Reach up to 2000 ms on Head A for spacious ambient and cinematic delay lines."
      ],
      controls: ["Time / Speed", "Tape Age", "Head Distance", "Mix", "Feedback"],
      specs: ["Designed for repeatable live settings", "Mono operation", "Standard 9V pedalboard power"],
      images: [
        "assets/images/ferromagnetic-14-877x800.jpg",
        "assets/images/ferromagnetic-5-780x780.jpg"
      ],
      primaryImageAlt: "Ferromagnetic delay pedal shown from the front with tape-style controls and three head selections.",
      galleryAlts: [
        "Ferromagnetic pedal front view showing the full control layout.",
        "Ferromagnetic pedal angled detail view highlighting the enclosure finish and switch layout."
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Ferromagnetic is a multi-head tape delay pedal with practical control over repeat texture, head combinations, and long-form ambient timing."
    },
    {
      slug: "reverberant",
      name: "Reverberant",
      line: "dsp",
      category: "Multi Space Reverb",
      shortDescription: "A flexible reverb platform with six spaces tuned for practical ambient, room, shimmer, and plate work.",
      features: [
        "Access six reverb voices across two banks: Hall, Plate, Spring, Large Hall, Room, and Shimmer.",
        "Dial pre-delay, decay, tone, and space quickly without secondary menus.",
        "Use Mix across a full dry-to-wet sweep for subtle depth or fully wet texture beds.",
        "Keep the control set compact enough for live recall while still covering studio detail."
      ],
      controls: ["Decay", "Pre-Delay", "Tone", "Space", "Mix"],
      specs: ["Designed for ambient and utility use alike", "Mono operation", "Standard 9V pedalboard power"],
      images: [
        "assets/images/reverberant-780x780.jpg"
      ],
      primaryImageAlt: "Reverberant pedal front view showing five controls for decay, pre-delay, tone, space, and mix.",
      galleryAlts: [
        "Reverberant pedal front view with the full reverb control layout."
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Reverberant is a multi-space reverb pedal with six voices, compact controls, and a dry-to-wet range suited to stage and studio use."
    },
    {
      slug: "dynamictremolo",
      name: "Dynamic Tremolo",
      line: "dsp",
      category: "Touch Sensitive Tremolo + Reverb",
      shortDescription: "A touch-aware tremolo that reacts to playing intensity and pairs modulation with a built-in space control.",
      features: [
        "Dynamic Intensity mode deepens the tremolo as your attack gets stronger.",
        "Dynamic Speed mode raises the modulation rate in response to playing energy.",
        "Switch between Sine, Saw, and Square wave shapes for smoother or sharper movement.",
        "Blend in reverb to move from dry pulse to more atmospheric modulation."
      ],
      controls: ["Intensity", "Speed", "Reverb", "Space", "Volume"],
      specs: ["True bypass", "Standard 9V negative-center power", "Mono in / mono out"],
      images: [
        "assets/images/dynamictremolo-780x780.jpg"
      ],
      primaryImageAlt: "Dynamic Tremolo pedal front view with modulation and reverb controls.",
      galleryAlts: [
        "Dynamic Tremolo pedal front view showing its control layout and footswitch."
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Dynamic Tremolo combines touch-sensitive modulation, selectable wave shapes, and built-in reverb for expressive live and studio use."
    },
    {
      slug: "crowdedchorus",
      name: "Crowded Chorus",
      line: "dsp",
      category: "Dynamic Chorus & Vibrato",
      shortDescription: "A chorus and vibrato pedal built for movement, width, and more expressive modulation under the fingers.",
      features: [
        "Move between Single, Multi, and Vibrato voices from one compact enclosure.",
        "Use the Dynamic mode to make the modulation respond more actively to your touch.",
        "Shape width and color with Depth, Speed, Tone, Space, and Mix for both subtle doubling and deeper swirl.",
        "Designed to stay practical on a real pedalboard instead of hiding core sounds behind presets."
      ],
      controls: ["Depth", "Speed", "Tone", "Space", "Mix"],
      toggles: ["Single / Multi / Vibrato", "Normal / Dynamic"],
      specs: ["Built for chorus-to-vibrato workflows", "Mono operation", "Standard 9V pedalboard power"],
      images: [
        "assets/images/crowdedchorus-780x780.jpg"
      ],
      primaryImageAlt: "Crowded Chorus pedal front view showing chorus and vibrato controls with two mode toggles.",
      galleryAlts: [
        "Crowded Chorus pedal front view with its modulation controls and toggle switches."
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Crowded Chorus delivers single, multi, and vibrato voices with dynamic response and a practical control set for pedalboard use."
    },
    {
      slug: "manyphasedgod",
      name: "Many-Phased God",
      line: "dsp",
      category: "Phaser",
      shortDescription: "A character phaser that moves from classic sweep to denser multi-stage textures without losing control.",
      features: [
        "Switch between Vintage, Classic, and Multi 8 phase characters to cover narrower or more dramatic movement.",
        "Use Dynamic mode when you want the effect to feel more reactive under changing pick attack.",
        "Dial depth, speed, feedback, and space for everything from restrained motion to wide, animated phase wash.",
        "Keep output control on the face of the pedal so modulation levels stay practical in a live rig."
      ],
      controls: ["Depth", "Speed", "Feedback", "Space", "Volume"],
      toggles: ["Vintage / Classic / Multi 8", "Normal / Dynamic"],
      specs: ["Built for modulation-heavy pedalboards", "Mono operation", "Standard 9V pedalboard power"],
      images: [
        "assets/images/manyphasedgod-780x780.jpg"
      ],
      primaryImageAlt: "Many-Phased God phaser pedal front view showing control knobs and mode toggles.",
      galleryAlts: [
        "Many-Phased God pedal front view with phaser controls and toggle modes."
      ],
      buyUrl: REVERB_STORE_URL,
      demoUrl: "",
      seoDescription: "Many-Phased God is a phaser pedal with multiple phase characters, dynamic response, and a control set tuned for live modulation work."
    }
  ];

  const legacyProducts = [
    {
      slug: "deli-dumrul",
      name: "Deli Dumrul",
      category: "High Gain Distortion",
      status: "Archived Analog Model",
      description: "An early-era handmade analog distortion from the brand's first production chapter.",
      videoUrl: ""
    },
    {
      slug: "1513",
      name: "1513",
      category: "Archived Analog Model",
      status: "Archived Analog Model",
      description: "A limited, early analog model preserved here for archive and brand history.",
      videoUrl: ""
    },
    {
      slug: "nemrut",
      name: "Nemrut",
      category: "Distortion",
      status: "Archived Analog Model",
      description: "A discontinued analog distortion model from the pre-DSP period of Dede Korkut Pedal.",
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
