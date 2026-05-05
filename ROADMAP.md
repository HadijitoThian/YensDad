# Roadmap - Yens Dad Project

## Current Status: MVP ✅

**Live:** Alphabet board + word prediction + quick phrases + TTS + message history  
**Deployed:** [Pending - see DEPLOYMENT.md]  
**Users Testing:** [Pending - family feedback]

---

## Phase 1: MVP (COMPLETE ✅ 2026-05-05)

### Delivered
- [x] Frontend: React + Vite
- [x] Backend: Express API
- [x] Alphabet board (26 letters, 10 numbers, 10 symbols)
- [x] Word prediction (Bahasa Indonesia)
- [x] 15 quick phrases
- [x] Text-to-speech
- [x] Message history
- [x] Responsive design (mobile/tablet/desktop)
- [x] Documentation (QUICKSTART, DEPLOYMENT, TESTING)
- [x] Railway + Vercel configs

### Not in MVP (by design)
- ❌ Persistence (no database)
- ❌ Multi-user/family chat
- ❌ Authentication
- ❌ Custom user profiles

---

## Phase 2: Improve Based on Feedback (Week 2-3)

### High Priority (after family testing)

#### 1. **More Quick Phrases** ⭐⭐⭐
**Why:** Family feedback will reveal actual needs  
**Tasks:**
- [ ] Collect 10-20 more common phrases from family
- [ ] Add to `backend/src/index.js` (COMMON_PHRASES array)
- [ ] Group into new categories if needed
- [ ] Test with relative
- [ ] Deploy to production

**Estimate:** 1-2 hours

**Example phrases to add (guess):**
- "Saya ingin berbaring"
- "Sakit di..." (pain locations)
- "Suara TV terlalu keras"
- "Buka jendela"
- "Hubungi dokter"
- "Saya ingin makan"
- "Air putih"
- "Aku senang ini"

#### 2. **Font Size Adjustment** ⭐⭐
**Why:** Family may say "bigger" or "smaller"  
**Tasks:**
- [ ] Adjust `AlphabetBoard.jsx` button heights
- [ ] Modify `tailwind.config.js` font sizes
- [ ] Test on relative's device
- [ ] Deploy

**Changes:**
```javascript
// Current: h-20 md:h-24 lg:h-28
// If bigger needed: h-24 md:h-32 lg:h-40
// If smaller ok: keep current
```

**Estimate:** 30 minutes

#### 3. **Bug Fixes** ⭐⭐
**Why:** Real usage will reveal edge cases  
**Tasks:**
- [ ] Fix any bugs found during family testing
- [ ] Test fixes
- [ ] Deploy

**Possible bugs:**
- TTS cutting off long messages
- Predictions not working for certain letters
- History display issues on mobile
- Button overlap on small screens

**Estimate:** Varies (1-4 hours based on bugs)

#### 4. **Accessibility Improvements** ⭐
**Why:** Better experience for elderly users  
**Tasks:**
- [ ] Add keyboard navigation (arrow keys to select letters)
- [ ] Add high-contrast mode (optional)
- [ ] Adjust colors if family reports difficulty
- [ ] Test with relative

**Estimate:** 2-3 hours

**Possible changes:**
```javascript
// Add to AlphabetBoard.jsx
const handleKeyDown = (e) => {
  if (e.key === 'Backspace') handleBackspace();
  if (e.key.match(/[a-z]/i)) onLetterClick(e.key.toUpperCase());
}
```

---

## Phase 3: Database & Persistence (Week 4+)

### Goal: Save messages permanently

#### 1. **Local Storage** (Quick fix)
**Why:** Keep history after page refresh  
**Time:** 1-2 hours

```javascript
// In App.jsx
const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem('messages');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('messages', JSON.stringify(history));
}, [history]);
```

**Pros:** Zero backend changes, instant  
**Cons:** Only works on same device

#### 2. **PostgreSQL Backend** (Proper solution)
**Why:** Store messages in database, share across devices  
**Time:** 4-6 hours

**Tasks:**
- [ ] Create PostgreSQL database (Railway or Vercel Postgres)
- [ ] Add auth (optional: Clerk or Auth0)
- [ ] Create `messages` table
- [ ] Add backend routes: `POST /api/messages`, `GET /api/messages`
- [ ] Update frontend to fetch/save messages
- [ ] Test end-to-end

**Schema:**
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Phase 4: Multi-Family Features (Month 2)

### Goal: Enable family to interact

#### 1. **Family Dashboard**
**Why:** Family can see message history + respond  
**Time:** 8-12 hours

**Features:**
- List of sent messages
- Ability for family to type quick responses
- TTS for family responses too
- Daily summary (X messages sent)

#### 2. **Notifications**
**Why:** Family gets notified when message sent  
**Time:** 4-6 hours (with Twilio/email API)

**Options:**
- **Email:** Family gets email with message + timestamp
- **WhatsApp:** Message sent to family WhatsApp group
- **Push notifications:** Browser notifications

#### 3. **Family Chat Interface**
**Why:** Two-way communication  
**Time:** 6-8 hours

**Features:**
- Family member can select and send pre-written responses
- Relative sees responses
- Two-way conversation flow
- Optional voice messages for family

---

## Phase 5: Advanced Features (Month 3+)

### Nice-to-haves (if time permits)

| Feature | Complexity | Value | Owner |
|---------|-----------|-------|-------|
| **Custom phrases per user** | Medium | High | TBD |
| **Emoji support** | Low | Medium | TBD |
| **Dark mode** | Low | Low | TBD |
| **Multiple languages** | High | Medium | TBD |
| **Voice recording** | High | Medium | TBD |
| **Emotion tracking** (mood check-ins) | Medium | Medium | TBD |
| **Daily reminders** | Low | Medium | TBD |
| **Doctor integration** | High | Low | TBD |
| **Prayer/meditation** | Medium | Low | TBD |
| **Photo gallery** | Medium | Low | TBD |

---

## Timeline

```
Week 1: MVP (DONE ✅)
├─ Frontend scaffolding
├─ Backend API
├─ Testing setup
└─ Documentation

Week 2: Family Testing + Quick Fixes
├─ Run on family device
├─ Collect feedback
├─ Fix bugs
├─ Add more phrases
└─ Adjust fonts/colors

Week 3: Persistence + Deployment
├─ Add localStorage
├─ Deploy to production
├─ Monitor usage
└─ Optimize based on metrics

Week 4+: Database + Multi-family
├─ Add PostgreSQL
├─ Family dashboard
├─ Notifications
└─ Advanced features (as needed)
```

---

## Success Metrics

### Phase 1 (MVP)
- [ ] Loads without errors
- [ ] All buttons work
- [ ] TTS sounds good
- [ ] Responsive on multiple devices

### Phase 2 (Feedback)
- [ ] Relative uses app 5+ minutes without help
- [ ] Family says "this helps a lot"
- [ ] No critical bugs found

### Phase 3 (Persistence)
- [ ] Messages saved after page refresh
- [ ] Family can see all messages ever sent
- [ ] Uptime > 99.5%

### Phase 4+ (Multi-family)
- [ ] Family actively uses dashboard
- [ ] Response time <1 second
- [ ] Daily active users > 3 family members
- [ ] Positive feedback on communication improvement

---

## Known Limitations & Trade-offs

| Limitation | Current Status | Future Plan |
|-----------|----------------|-------------|
| **No persistence** | MVP - memory only | Phase 3: localStorage → PostgreSQL |
| **Single user** | By design (MVP) | Phase 4: multi-user support |
| **No family interaction** | By design (MVP) | Phase 4: family dashboard |
| **TTS browser only** | By design (Web API) | Phase 3+: native TTS option |
| **Indonesia only** | By design | Phase 5: multi-language (maybe) |
| **No offline mode** | By design | Phase 5+: service worker (maybe) |

---

## Budget Estimate (if hiring dev)

| Phase | Hours | Cost (@ $25/hr) |
|-------|-------|-----------------|
| Phase 1: MVP | 8 | $200 |
| Phase 2: Feedback & Fixes | 6 | $150 |
| Phase 3: Database & Persistence | 8 | $200 |
| Phase 4: Multi-family | 20 | $500 |
| Phase 5: Advanced | 20+ | $500+ |
| **Total (Phases 1-4)** | **42** | **$1,050** |

**Note:** Being done by Emma (AI) = $0 cost! 🤖

---

## Deployment Milestones

```
2026-05-05: MVP Built
   ↓
2026-05-07: Family Testing (real device)
   ↓
2026-05-10: Deploy to Production (Railway + Vercel)
   ↓
2026-05-15: Feedback collected → Phase 2 starts
   ↓
2026-05-20: Bug fixes + new phrases → Re-deploy
   ↓
2026-05-30: Database added → Phase 3 complete
   ↓
2026-06-15: Multi-family features → Phase 4 complete
```

---

## Questions for Hadi/Family

To prioritize roadmap, ask:

1. **Usage frequency:** Will relative use daily? Several times daily?
2. **Primary use case:** Messages to family? Medical needs? Social?
3. **Multi-user:** Will multiple family members need to respond?
4. **Persistence:** Important to have full history?
5. **Notifications:** Should family get alerts?
6. **Accessibility:** Any other needs? (wheelchair, eye-gaze, etc.)
7. **Timeline:** Urgent? Or can iterate slowly?
8. **Budget:** Any budget for maintenance/hosting?

---

## Notes

- All features tested locally before deployment
- Family feedback drives priority
- Keep UI simple (no feature bloat)
- Accessibility always a priority
- Documentation kept current
- Bugs fixed immediately

---

**Last Updated:** 2026-05-05  
**Status:** Ready for Phase 2 (family testing)
