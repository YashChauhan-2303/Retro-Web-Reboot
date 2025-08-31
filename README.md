*ByteTunes – A Retro Napster-Inspired Music Streaming Experience*

### 1. Introduction  
ByteTunes is a retro-styled music streaming app that brings back the nostalgia of early peer-to-peer file sharing and MP3 players while also integrating modern streaming via Spotify. The app allows users to browse and play locally stored songs while also fetching their current Spotify playback information.

### 2. Design & Era Inspiration  
#### 🎨 Visual Style  
ByteTunes is styled to look like a Windows 98-era desktop application, inspired by software like Winamp, Napster, and Limewire.

*Key design elements include:*  
•⁠  ⁠*Pixelated Fonts & Boxy UI* – Authentic retro software aesthetics.  
•⁠  ⁠*Win98-Inspired Buttons & Borders* – Classic Windows aesthetics.  
•⁠  ⁠*Minimalist File-Based Music Library* – Just a list of songs with essential details.  
•⁠  ⁠*Blue Highlighting & System Colors* – Resembling old file selection UI.  

#### 🕰 The 90s/2000s Vibe  
•⁠  ⁠*MP3 Collection Era* – Before streaming, users managed their own libraries.  
•⁠  ⁠*P2P Networks* – Inspired by Napster, Kazaa, and Limewire interfaces.  
•⁠  ⁠*No Clutter, Just Music* – A simple UI focused purely on playback.  

### 3. Functionality & Features  
ByteTunes is designed to seamlessly merge local playback with Spotify streaming.

#### 🎵 1. Local Music Playback  
•⁠  ⁠Songs are locally stored and listed in a Napster-style table format.  
•⁠  ⁠Click a song to start playing it – The selected song starts playing.  
•⁠  ⁠*Metadata Display* – Shows filename, size, length, and user details.  

#### 🎹 2. Interactive Player Controls  
•⁠  ⁠*Play/Pause* – Toggle playback with a single click.  
•⁠  ⁠*Stop Button* – Resets the track and stops playback.  
•⁠  ⁠*Auto-Stop on Song End* – Playback stops when a song finishes.  
•⁠  ⁠*Track Indicator* – Shows a ▶️ or ⏸ symbol to indicate playback status.  

#### 🌎 3. Spotify Integration  
This app is connected to Spotify, allowing users to fetch and display their currently playing track.

•⁠  ⁠Authenticate via the top bar button.  
•⁠  ⁠Click "Get Songs" to retrieve your Spotify playback data.  
•⁠  ⁠Your current Spotify song information appears below the local music list.  
•⁠  ⁠Seamlessly switch between local music playback and Spotify streaming.  

### *Note*  
We are using the Spotify API to retrieve the user's playlists, tracks, and currently playing song. Our app successfully displays the song being played on the user's phone. However, the Spotify API is designed in such a way that the access token it generates is only valid for 15 minutes, after which it stops working.  

While developing this music player, we explored many other music APIs, but currently, none exist that provide a playback feature for music. As a result, we had to store songs in a folder to enable playback. Due to time constraints, we had to drop a few ideas, such as showing other friends online, as a significant amount of our time was spent working on music API limitations.  

#### 🗒 4. Feedback Page  
•⁠  ⁠A dedicated feedback section allows users to share their thoughts.  
•⁠  ⁠Users can submit reviews about their experience, feature requests, or bug reports.  
•⁠  ⁠The feedback form ensures ByteTunes can continuously improve.  

### 5. Tech Stack  
ByteTunes is built using modern web technologies, ensuring smooth performance with a retro aesthetic.

•⁠  ⁠*Frontend:* React.js, Tailwind CSS for styling.  
•⁠  ⁠*Backend:* Node.js, PostgreSQL for storing user preferences & feedback.  
•⁠  ⁠*Authentication:* Supabase for login & Spotify API integration.  
•⁠  ⁠*Hosting:* Deployed via Vercel for instant, scalable performance.  

### 6. Conclusion  
ByteTunes is the perfect blend of old and new—a nostalgic MP3 player with modern streaming integration. Whether you're reliving the early 2000s or just love retro software aesthetics, ByteTunes delivers a refreshing take on digital music.  


