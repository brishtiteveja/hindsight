"""Fact-check crossref — official Google Fact Check Tools API (claim search).

Aggregates PolitiFact, AFP, FullFact, Snopes and others through Google's free,
ToS-clean endpoint. Given an actor name (or any claim text) it returns published
fact-checks with ratings and source links — the same shape the Perspectivity
deployment serves from its richer PolitiFact corpus.

Requires GOOGLE_FACTCHECK_API_KEY (free at console.cloud.google.com — enable
"Fact Check Tools API"). Disabled (returns []) without it.

Honest typing: a "False" rating is a credibility signal about a claim; only a
documented reversal (e.g. PolitiFact Flip-O-Meter) is a self-contradiction."""

import os

import httpx

_ENDPOINT = "https://factchecktools.googleapis.com/v1alpha1/claims:search"


def enabled() -> bool:
    return bool(os.getenv("GOOGLE_FACTCHECK_API_KEY", ""))


def search_claims(query: str, max_results: int = 20,
                  publisher: str = "") -> list[dict]:
    """Search published fact-checks. publisher e.g. 'politifact.com' to filter."""
    key = os.getenv("GOOGLE_FACTCHECK_API_KEY", "")
    if not key or not query.strip():
        return []
    params = {"query": query, "key": key, "pageSize": max_results,
              "languageCode": "en"}
    if publisher:
        params["reviewPublisherSiteFilter"] = publisher
    try:
        r = httpx.get(_ENDPOINT, params=params, timeout=15)
        if r.status_code != 200:
            return []
        out = []
        for claim in (r.json() or {}).get("claims", []):
            for review in claim.get("claimReview", []):
                out.append({
                    "claim": claim.get("text", ""),
                    "claimant": claim.get("claimant", ""),
                    "claim_date": claim.get("claimDate", "")[:10],
                    "rating": review.get("textualRating", ""),
                    "publisher": (review.get("publisher") or {}).get("name", ""),
                    "url": review.get("url", ""),
                    "review_date": (review.get("reviewDate") or "")[:10],
                })
        return out
    except Exception:
        return []


def actor_factchecks(actor: str, max_results: int = 20) -> list[dict]:
    """Published fact-checks where the actor is the claimant."""
    results = search_claims(actor, max_results=max_results)
    want = actor.strip().lower()
    return [r for r in results
            if want in (r.get("claimant") or "").lower()] or results
