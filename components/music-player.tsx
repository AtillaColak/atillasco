'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

interface Track {
  title: string
  artist: string
  file: string
}

const playlist = {
  title: "Atilla's Playlist",
  createdOn: "10/10/2024",
  tracks: [
    { title: "Unbroken", artist: "Max Herman", file: "/sounds/unbroken.mp3" },
    { title: "To The Child Drifting Out At Sea", artist: "Owsey", file: "/sounds/ToTheChild.mp3" },
    { title: "The Breaking of the Fellowship", artist: "Howard Shore", file: "/sounds/Fellowship.mp3" },
    { title: "Honor Him", artist: "Hans Zimmer", file: "/sounds/HonorHim.mp3" },
    { title: "A Small Measure of Peace", artist: "Hans Zimmer", file: "/sounds/peace.mp3" },
    { title: "Over Hill", artist: "Howard Shore", file: "/sounds/overhill.mp3" },
    { title: "Safe & Sound Cover", artist: "William Joseph", file: "/sounds/safensound.mp3" },
    { title: "The Legend Begins", artist: "Marc Streitenfeld", file: "/sounds/legends.mp3" },
    { title: "Dance of the Druids", artist: "Bear McCreary", file: "/sounds/druids.mp3" },
    { title: "Morrowind Recomposed", artist: "Rubric", file: "/sounds/morrowind.mp3" },
  ]
}

export default function SpotifyPlayer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [trackDurations, setTrackDurations] = useState<number[]>([])
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const previousVolumeRef = useRef(1)

  useEffect(() => {
    const calculateDurations = async () => {
      const durations = await Promise.all(
        playlist.tracks.map(track => 
          new Promise<number>((resolve) => {
            const audio = new Audio(track.file)
            audio.addEventListener('loadedmetadata', () => {
              resolve(audio.duration)
            })
          })
        )
      )
      setTrackDurations(durations)
    }

    calculateDurations()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress)
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration)
      })
      audioRef.current.addEventListener('ended', () => {
        setCurrentTime(0)
        setIsPlaying(false)
      })

      // Set initial volume
      audioRef.current.volume = isMuted ? 0 : volume
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress)
        audioRef.current.removeEventListener('ended', () => {})
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      const volumeToSet = isMuted ? 0 : volume
      audioRef.current.volume = volumeToSet
    }
  }, [volume, isMuted])

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restartCurrentTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      if (!isPlaying) {
        setIsPlaying(true)
        audioRef.current.play()
      }
    }
  }

  const nextTrack = () => {
    if(currentTrack != playlist.tracks.length - 1){
        setCurrentTrack((currentTrack + 1))
        setCurrentTime(0)
        setIsPlaying(true)    
    }
    else{
        restartCurrentTrack()
    }
  }

  const prevTrack = () => {
    if(currentTrack != 0){
        setCurrentTrack((currentTrack - 1))
        setCurrentTime(0)
        setIsPlaying(true)    
    }
    else{
        restartCurrentTrack()
    }
  }

  const onProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const onVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }

    if (newVolume === 0) {
      setIsMuted(true)
    }

    if (audioRef.current) {
      // Directly set the volume on the audio element
      audioRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute: Restore previous volume
        setVolume(previousVolumeRef.current)
        audioRef.current.volume = previousVolumeRef.current
      } else {
        // Mute: Store current volume and set to 0
        previousVolumeRef.current = volume
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <audio 
        ref={audioRef}
        src={playlist.tracks[currentTrack].file}
        onEnded={nextTrack}
        autoPlay={isPlaying}
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <div className="flex flex-col bg-[#322C2B] text-[#E4C59E] rounded-lg">
            <div className="flex items-center p-4 border-b border-[#AF8260]">
              <div className="w-16 h-16 mr-4 bg-[#803D3B] rounded-md overflow-hidden">
                <img 
                  src="https://static.wikia.nocookie.net/natm/images/b/bc/Attilla.jpg"
                  alt="Album cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{playlist.title}</h2>
                <p className="text-sm text-[#AF8260]">Created on {playlist.createdOn}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="ml-auto rounded-full text-[#AF8260] hover:text-[#E4C59E] hover:bg-[#803D3B]"
                onClick={onClose}
              >
              </Button>
            </div>
            <div className="p-4">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={onProgressChange}
                className="w-full mb-2 bg-hs-third"
              />
              <div className="flex justify-between text-xs text-[#AF8260] mb-4">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#AF8260] hover:text-[#E4C59E] hover:bg-[#803D3B]"
                  onClick={prevTrack}
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-[#E4C59E] hover:scale-110 transition bg-[#803D3B] hover:bg-[#AF8260] rounded-full h-14 w-14 flex items-center justify-center"
                  onClick={playPause}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-[#AF8260] hover:text-[#E4C59E] hover:bg-[#803D3B]"
                  onClick={nextTrack}
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-[#AF8260] hover:text-[#E4C59E] hover:bg-[#803D3B]"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={onVolumeChange}
                    className="w-24 bg-hs-third"
                  />
                </div>
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto custom-scroll">
            <style jsx>{`
                .custom-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .custom-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
              {playlist.tracks.map((track, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-2 hover:bg-[#803D3B] cursor-pointer ${currentTrack === index ? 'bg-[#803D3B]' : ''}`}
                  onClick={() => { setCurrentTrack(index); setIsPlaying(true); }}
                >
                  <span className="w-6 text-center">{index + 1}</span>
                  <div className="flex-grow ml-2">
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-[#AF8260]">{track.artist}</div>
                  </div>
                  <span className="text-sm text-[#AF8260]">
                    {trackDurations[index] ? formatTime(trackDurations[index]) : '--:--'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}