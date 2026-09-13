"""Issue taxonomy + channel facets — the vocabulary the front page browses by.

ISSUES groups the policy-issue space into families (Healthcare, Economy,
Education, …), each with the specific issues underneath and the digest topic
keys that map to it. FACETS are the non-issue ways to slice the map: by domain
(AI, fintech, politics) and by lean (left / center / right).

Art direction lives here too: every family carries a hue, and cover art is
generated from it (see artwork.py) — no stock-photo dependency, no licensing
question, and new families get art for free.
"""

# ── issue families ───────────────────────────────────────────────────────────
# key: (label, hue, [issues…], [topic keys that map here])
ISSUES = {
    "healthcare": (
        "Healthcare & Public Health", "#7fd6a4", 
        ["Medicare for All / universal healthcare", "Affordable Care Act",
         "Pandemic response & preparedness", "The opioid crisis"],
        ["public_health", "healthcare", "pandemic", "drugs", "opioid"],
    ),
    "economy": (
        "Economy & Finance", "#f0b243", 
        ["Growth & job creation", "Income and wealth inequality",
         "Taxation", "Federal budget & spending",
         "Financial regulation", "Minimum wage"],
        ["economy", "taxation", "inequality", "budget", "banking", "finance",
         "wages", "trade"],
    ),
    "education": (
        "Education", "#8fb7de", 
        ["K-12 reform", "Higher education & student debt",
         "Early childhood & child care", "School choice"],
        ["education", "youth_and_students", "student_debt", "schools"],
    ),
    "foreign_policy": (
        "Foreign Policy & Security", "#c9a7f5", 
        ["America First", "Diplomacy", "Military strength & spending",
         "Terrorism", "Trade agreements", "Relations with China", "NATO"],
        ["foreign_policy", "military_veterans", "terrorism", "china",
         "war", "national_security", "geopolitics"],
    ),
    "immigration": (
        "Immigration", "#ff9d7a", 
        ["Border security", "Path to citizenship", "Refugees & asylum"],
        ["immigration", "border", "refugees"],
    ),
    "climate": (
        "Climate & Environment", "#9be0dd", 
        ["Green New Deal", "Clean energy", "Environmental protection",
         "Energy independence"],
        ["climate_environment", "culture_environment", "energy", "climate"],
    ),
    "justice": (
        "Social Justice & Civil Rights", "#d68fb0", 
        ["Racial justice", "LGBTQ+ rights", "Women's rights & gender equality",
         "Criminal justice reform", "Police reform"],
        ["human_rights", "criminal_justice", "racial_justice", "lgbtq",
         "gender", "police", "civil_rights"],
    ),
    "labor": (
        "Labor & Employment", "#b5c98f", 
        ["Workers' rights", "Union support", "Workforce development"],
        ["labor", "unions", "employment", "jobs"],
    ),
    "guns": (
        "Gun Policy", "#ff7b66", 
        ["Second Amendment rights", "Gun control measures"],
        ["guns", "gun_policy", "second_amendment"],
    ),
    "government": (
        "Government Reform", "#ffd98a", 
        ["Campaign finance", "Voting rights & electoral reform",
         "Ethics & transparency", "Anti-corruption"],
        ["governance", "corruption", "elections_voting", "elections",
         "democracy", "campaign_finance"],
    ),
    "welfare": (
        "Social Welfare", "#a7d3f5", 
        ["Social Security", "Safety net programs", "Poverty reduction"],
        ["social_welfare", "poverty", "social_security", "safety_net"],
    ),
    "housing": (
        "Housing & Infrastructure", "#e0a67a", 
        ["Housing & urban development", "Affordable housing", "Infrastructure"],
        ["housing", "infrastructure", "urban"],
    ),
    "tech": (
        "Science & Technology", "#6ec8f5", 
        ["AI & technology regulation", "Space exploration", "Research funding"],
        ["technology_regulation", "ai", "space", "science", "technology"],
    ),
    "speech": (
        "Media & Free Speech", "#f5b5d0", 
        ["Media criticism", "First Amendment rights", "Platform moderation"],
        ["media", "free_speech", "misinformation", "press", "conspiracy_framing"],
    ),
    "constitution": (
        "Constitutional Issues", "#cdbb9e", 
        ["Supreme Court appointments", "Executive powers", "Federalism"],
        ["supreme_court", "constitution", "law_and_order", "judiciary"],
    ),
    "veterans": (
        "Veterans Affairs", "#9fb8a0", 
        ["Veterans' healthcare", "Benefits & services"],
        ["veterans", "military_veterans"],
    ),
    "agriculture": (
        "Agriculture & Rural", "#c7d68f", 
        ["Farm policy", "Rural development"],
        ["agriculture", "rural", "farming"],
    ),
    "religion": (
        "Religion & Culture", "#c5a8e0", 
        ["Religion in politics", "Culture war", "Family policy"],
        ["religion_politics", "culture_war", "religion", "family"],
    ),
}

# ── domain facets: how the channel itself is oriented ────────────────────────
FACETS = {
    "ai": ("AI & Frontier Tech", "#6ec8f5", 
           ["ai", "technology_regulation", "science", "space", "technology"]),
    "fintech": ("Money & Markets", "#f0b243", 
                ["economy", "finance", "banking", "trade", "taxation"]),
    "politics": ("Politics & Power", "#ff9d7a", 
                 ["governance", "elections_voting", "elections", "democracy",
                  "corruption", "foreign_policy"]),
    "culture": ("Culture & Society", "#d68fb0", 
                ["human_rights", "culture_war", "religion_politics",
                 "youth_and_students", "education"]),
}

# ── political lean, from the node group label ────────────────────────────────
LEANS = {
    "left":   ("From the Left",   "#8fb7de"),
    "center": ("From the Center", "#cdbb9e"),
    "right":  ("From the Right",  "#ff9d7a"),
}


def art_url(kind: str, key: str) -> str:
    """Path to the generated cover for an issue/facet."""
    return f"v1/art/{kind}/{key}.svg"


def lean_of(group: str) -> str:
    g = (group or "").lower()
    if "left" in g:
        return "left"
    if "right" in g:
        return "right"
    return "center"


def _match(topic: str, keys: list[str]) -> bool:
    t = (topic or "").lower()
    return any(k in t or t in k for k in keys)


def issue_scores(topics: list[dict]) -> dict[str, int]:
    """{issue_key: mention count} for a channel's topic list."""
    out: dict[str, int] = {}
    for t in topics:
        name, n = t.get("topic", ""), t.get("count") or t.get("mentions") or 1
        for key, (_, _, _, keys) in ISSUES.items():
            if _match(name, keys):
                out[key] = out.get(key, 0) + n
    return out


def facet_scores(topics: list[dict]) -> dict[str, int]:
    """{facet_key: mention count} for a channel's topic list."""
    out: dict[str, int] = {}
    for t in topics:
        name, n = t.get("topic", ""), t.get("count") or t.get("mentions") or 1
        for key, (_, _, keys) in FACETS.items():
            if _match(name, keys):
                out[key] = out.get(key, 0) + n
    return out


def catalog() -> dict:
    """The browse vocabulary, for the front page."""
    return {
        "issues": [{"key": k, "label": v[0], "hue": v[1],
                    "image": art_url("issue", k), "issues": v[2]}
                   for k, v in ISSUES.items()],
        "facets": [{"key": k, "label": v[0], "hue": v[1],
                    "image": art_url("facet", k)} for k, v in FACETS.items()],
        "leans": [{"key": k, "label": v[0], "hue": v[1]} for k, v in LEANS.items()],
    }
