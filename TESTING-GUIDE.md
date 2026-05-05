# Testing Guide - Yens Dad Project

## 🧪 Pre-Launch Checklist

Before going live, test everything systematically. This guide covers all features.

---

## PART 1: Local Testing (Development)

### Setup
```bash
# Terminal 1: Backend
cd backend
npm start
# ✅ Should see: "✅ Yens Dad Backend berjalan di http://localhost:5000"

# Terminal 2: Frontend
cd frontend
npm run dev
# ✅ Should see: "➜  Local:   http://localhost:5173/"
```

### Test Each Feature

#### 1️⃣ **Alphabet Board**

| Test | Steps | Expected | ✅/❌ |
|------|-------|----------|-------|
| **Huruf besar** | Click A, B, C | Message shows "ABC" | |
| **Angka** | Click 0, 1, 2 | Message shows "012" | |
| **Tanda baca** | Click . , ! | Message shows ".  ,  !" | |
| **Button size** | Look at buttons | Very large (easy to see) | |
| **Button color** | Observe colors | Blue (letters), Green (numbers), Purple (symbols) | |
| **Hover effect** | Hover mouse over button | Button changes shade darker | |
| **Active effect** | Click button (during click) | Button scales down briefly | |
| **Touch (mobile)** | Tap on phone/tablet | Buttons respond to touch | |

#### 2️⃣ **Word Prediction**

| Test | Steps | Expected | ✅/❌ |
|------|-------|----------|-------|
| **Saran kata** | Click A → observe | Prediction box shows "aku, ada, akan, ambil, aman, adalah" | |
| **Click prediction** | Type "a", click "aku" | Message becomes "aku " (with space) | |
| **Ganti last letter** | Type "ab", prediction removes "b" and replaces with word | Works correctly | |
| **Banyak prediksi** | Try letters b, c, d, etc. | Each has 6 suggestions | |
| **Prediction clear** | Type multiple letters | Predictions disappear (OK, not needed) | |

#### 3️⃣ **Quick Phrases**

| Test | Steps | Expected | ✅/❌ |
|------|-------|----------|-------|
| **Frasa respons** | Click "Ya" | Message becomes "Ya" | |
| **Frasa kebutuhan** | Click "Saya ingin minum" | Message becomes "Saya ingin minum" | |
| **Frasa kesehatan** | Click "Saya sakit" | Message becomes "Saya sakit" | |
| **Frasa emosi** | Click "Saya sayang kamu" | Message becomes "Saya sayang kamu" | |
| **All 15 phrases** | Test each one | All work correctly | |
| **Category grouping** | Observe layout | Phrases grouped by category with icons | |
| **Button size** | Look at phrase buttons | Large enough to tap | |

#### 4️⃣ **Message Display & Controls**

| Test | Steps | Expected | ✅/❌ |
|------|-------|----------|-------|
| **Display pesan** | Type message | Message appears in blue box | |
| **Character counter** | Look below display | Shows correct character count | |
| **Backspace (← Hapus)** | Type "ABC", click Hapus | Becomes "AB" | |
| **Clear (✕ Bersih)** | Type "ABC", click Bersih | Message disappears | |
| **Speak (🔊 Dengar)** | Type "Halo", click Dengar | App says "Halo" in Indonesian | |
| **Send (✓ Kirim)** | Type "Test", click Kirim | Message added to history + cleared + spoken | |
| **Send disabled** | Click Kirim with empty message | Button disabled (gray) | |
| **Speak disabled** | Click Dengar with empty message | Button disabled (gray) | |

#### 5️⃣ **Text-to-Speech (TTS)**

| Test | Steps | Expected | ✅/❌ |
|------|-------|----------|-------|
| **Bahasa** | Speak a message | Speaks in Indonesian accent | |
| **Speed** | Listen to TTS | Speaks slowly (easy to understand) | |
| **Clear audio** | Listen carefully | Words are distinct, no distortion | |
| **Multiple messages** | Speak 3 times quickly | No overlapping audio | |
| **Stop speaking** | (If browser supports) | Can interrupt TTS | |
| **No audio** | System without speakers | No error (graceful fail) | |

#### 6️⃣ **Message History**

| Test | Steps | Expected | ✅/❌ |
|------|-------|----------|-------|
| **First message** | Send "Halo" | Appears in history grid | |
| **Multiple messages** | Send 3-5 messages | All appear in grid | |
| **Timestamp** | Look at history | Each message shows time (HH:MM:SS) | |
| **Grid layout** | Send many messages | Grid displays nicely (multiple rows) | |
| **Message styling** | Look at history boxes | Nice styling with blue background | |
| **Persistence** | Refresh page (F5) | History disappears (expected for MVP) | |

#### 7️⃣ **Responsive Design**

| Device | Resolution | Test | Expected | ✅/❌ |
|--------|-----------|------|----------|-------|
| **Desktop** | 1920x1080 | Open app | 3-column layout (alphabet, message, phrases) | |
| **Tablet** | 768x1024 | Open app | Adjusted spacing, still usable | |
| **Mobile** | 375x667 | Open app | Stacked layout, buttons sized for touch | |
| **Very small** | 320x568 | Test buttons | All buttons still clickable | |
| **Font scaling** | All devices | Text sizes | Scales appropriately per device | |
| **Zoom** | Browser zoom 150% | Still usable? | No layout break | |

#### 8️⃣ **API Testing**

Open a new tab and visit these URLs. Should return JSON:

| Endpoint | URL | Expected Response | ✅/❌ |
|----------|-----|-------------------|-------|
| **Health** | http://localhost:5000/api/health | `{status: "ok", message: "..."}` | |
| **Alphabet** | http://localhost:5000/api/alphabet | `{uppercase: [...], lowercase: [...], numbers: [...], symbols: [...]}` | |
| **Phrases** | http://localhost:5000/api/phrases | `[{id, text, category}, ...]` 15 items | |
| **Predict A** | http://localhost:5000/api/predict/a | `{letter: "a", predictions: [6 words]}` | |
| **Predict B** | http://localhost:5000/api/predict/b | `{letter: "b", predictions: [6 words]}` | |

---

## PART 2: Family Testing (Real-World)

Once local tests pass, let family use it:

### Setup for Testing
1. Run backend + frontend on your machine
2. Share URL: http://YOUR_IP:5173 (find with `ipconfig`)
   - Or use localhost:5173 if on same machine
3. Give relative a tablet or mouse
4. Observe for 5-10 minutes

### Observation Questions

Ask family these questions:

1. **Visibility**
   - [ ] Can they see the letters clearly?
   - [ ] Are buttons big enough?
   - [ ] Is text readable?
   - [ ] Any glare issues?

2. **Usability**
   - [ ] Easy to click/tap buttons?
   - [ ] Can they understand what each button does?
   - [ ] Predictions helpful?
   - [ ] Quick phrases useful?

3. **Functionality**
   - [ ] Typing works as expected?
   - [ ] Text-to-speech audible and clear?
   - [ ] History shows messages?
   - [ ] Any errors or weird behavior?

4. **Improvements**
   - [ ] What phrases would be useful?
   - [ ] Any letters/words missing?
   - [ ] Better layout suggestions?
   - [ ] Anything confusing?

### Record Feedback

Create `Yens-Dad-Feedback.md`:
```markdown
# Family Testing Feedback - [DATE]

## What Worked Well
- Large fonts were great
- Buttons responsive
- TTS clear

## Issues Found
- Font could be bigger
- Missing phrase: "Mau tidur"

## Suggestions
- Add more phrases for daily needs
- Change blue to higher contrast

## Next Steps
- Increase font 10%
- Add 5 more phrases
```

---

## PART 3: Deployment Testing

After deploying to Railway + Vercel:

### Test Live URLs

| Component | Test | Expected | ✅/❌ |
|-----------|------|----------|-------|
| **Frontend URL** | Open https://yens-dad.vercel.app | App loads (no errors) | |
| **Backend health** | GET https://api.railway.app/api/health | Returns `{status: "ok"}` | |
| **Alphabet** | Click letter on live app | Message updates | |
| **API call** | Click letter | Network tab shows GET to backend API | |
| **TTS on HTTPS** | Click "Dengar" on live app | Speaks (HTTPS required) | |
| **History persistence** | Send message, refresh page | History gone (expected) | |
| **No console errors** | Open DevTools (F12) → Console | No red errors | |
| **Responsive** | Test on mobile (live) | Layout works | |
| **Performance** | Test speed | App loads in <2 seconds | |

---

## PART 4: Accessibility Audit

Make sure it's accessible for elderly user:

| Feature | Test | Pass/Fail |
|---------|------|-----------|
| **Font size** | Can read from 1 meter away | |
| **Color contrast** | Blue on white sufficient? | |
| **Button size** | Minimum 48x48px (touchable) | |
| **Touch targets** | Buttons spaced 8px apart | |
| **Focus states** | Can see keyboard focus (if keyboard used) | |
| **TTS quality** | Clear pronunciation of Indonesian | |
| **No flashing** | No rapid color changes | |
| **Text alternatives** | All symbols have text labels | |

---

## PART 5: Bug Checklist

If you find bugs, document them:

```markdown
## Bug Report

**Title:** [Short description]
**Severity:** Critical / High / Medium / Low
**Steps to Reproduce:**
1. ...
2. ...
3. ...

**Expected Behavior:**
...

**Actual Behavior:**
...

**Screenshots:**
[Attach if possible]

**Environment:**
- Device: (Desktop/Tablet/Mobile)
- Browser: (Chrome/Firefox/Safari)
- Screen size: (1920x1080 / 768x1024 / etc.)
```

---

## PART 6: Performance Testing

Test speed & responsiveness:

| Test | How | Target | Result |
|------|-----|--------|--------|
| **Page load** | Open app, measure | <2 sec | |
| **Letter click** | Click button, measure response | <100ms | |
| **TTS delay** | Click speak, measure delay | <500ms | |
| **API response** | Check network tab | <200ms | |
| **Heavy usage** | Click 50 times fast | No lag or crashes | |
| **Memory leak** | Send 100 messages, check memory | Stable | |

---

## FINAL SIGN-OFF

Before going fully live:

- [ ] All local tests pass
- [ ] Family tested successfully
- [ ] Deployment tests pass
- [ ] No critical bugs
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Accessibility good
- [ ] Documentation complete

✅ **Ready for production!**

---

## Troubleshooting During Testing

### "API not found" error
- Ensure backend is running (`npm start` in `backend/` folder)
- Check if port 5000 is in use
- Verify `vite.config.js` proxy is correct

### "No sound from TTS"
- Ensure speakers are on
- Test at http://localhost:5173 (not HTTPS error)
- Check browser TTS permissions

### "Buttons not responding"
- Ensure JavaScript is enabled
- Check DevTools console for errors
- Try different browser

### "Layout broken on mobile"
- Clear browser cache (Ctrl+Shift+Delete)
- Check viewport meta tag in `index.html`
- Test in browser DevTools mobile view

### "Can't deploy to Vercel"
- Ensure `vite.config.js` has correct build path
- Check `.env` variables are set in Vercel dashboard
- Verify GitHub repo is public

---

**Happy testing! 🧪**
