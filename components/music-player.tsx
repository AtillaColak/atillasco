"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Music } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  ],
}

export default function SpotifyPlayer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [trackDurations, setTrackDurations] = useState<number[]>([])
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const previousVolumeRef = useRef(0.7)

  // Fix for the progress bar bug - reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0)
      setIsLoaded(false)

      // Small delay to ensure audio element is properly reset
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          setIsLoaded(true)
        }
      }, 100)
    }
  }, [isOpen])

  useEffect(() => {
    const calculateDurations = async () => {
      const durations = await Promise.all(
        playlist.tracks.map(
          (track) =>
            new Promise<number>((resolve) => {
              const audio = new Audio(track.file)
              audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration)
              })
              // Add error handling
              audio.addEventListener("error", () => {
                resolve(0)
              })
            }),
        ),
      )
      setTrackDurations(durations)
    }

    calculateDurations()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress)
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current!.duration)
        setIsLoaded(true)
      })
      audioRef.current.addEventListener("ended", () => {
        setCurrentTime(0)
        setIsPlaying(false)
      })

      // Set initial volume
      audioRef.current.volume = isMuted ? 0 : volume
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress)
        audioRef.current.removeEventListener("ended", () => {})
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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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
    if (currentTrack != playlist.tracks.length - 1) {
      setCurrentTrack(currentTrack + 1)
      setCurrentTime(0)
      setIsPlaying(true)
    } else {
      restartCurrentTrack()
    }
  }

  const prevTrack = () => {
    if (currentTrack != 0) {
      setCurrentTrack(currentTrack - 1)
      setCurrentTime(0)
      setIsPlaying(true)
    } else {
      restartCurrentTrack()
    }
  }

  const onProgressChange = (value: number[]) => {
    if (audioRef.current && isLoaded) {
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
      <audio ref={audioRef} src={playlist.tracks[currentTrack].file} onEnded={nextTrack} autoPlay={isPlaying} />
      <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
        <DialogContent className="sm:max-w-[500px] p-0 border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="flex flex-col bg-[#f5f5f5] text-gray-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-white">
              <div className="w-16 h-16 mr-4 bg-red-600 rounded-xl overflow-hidden shadow-md">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
                <img 
                  src="https://static.wikia.nocookie.net/natm/images/b/bc/Attilla.jpg"
                  alt="Album cover" 
                  className="w-full h-full object-cover h-8 w-8"
                />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{playlist.title}</h2>
                <p className="text-sm text-gray-500">Created on {playlist.createdOn}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Player controls */}
            <div className="p-6 bg-white">
              {/* Track info */}
              <div className="mb-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{playlist.tracks[currentTrack].title}</h3>
                <p className="text-sm text-gray-500">{playlist.tracks[currentTrack].artist}</p>
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-1 bg-gray-200 rounded-full mb-2 overflow-visible">
                <div
                  className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                ></div>
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={onProgressChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={!isLoaded}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-6">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full w-10 h-10"
                  onClick={prevTrack}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="text-white hover:scale-105 transition bg-red-600 hover:bg-red-700 rounded-full h-14 w-14 flex items-center justify-center shadow-md"
                  onClick={playPause}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full w-10 h-10"
                  onClick={nextTrack}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Volume control */}
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full w-8 h-8"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="relative w-24 h-1 bg-gray-200 rounded-full overflow-visible">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  ></div>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={onVolumeChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="max-h-48 overflow-y-auto bg-[#f5f5f5]">
              <AnimatePresence>
                {playlist.tracks.map((track, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center p-3 hover:bg-white/70 cursor-pointer border-b border-gray-200 ${
                      currentTrack === index ? "bg-white" : ""
                    }`}
                    onClick={() => {
                      setCurrentTrack(index)
                      setCurrentTime(0)
                      setIsPlaying(true)
                    }}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                        currentTrack === index ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentTrack === index && isPlaying ? (
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className={`font-medium ${currentTrack === index ? "text-red-600" : "text-gray-800"}`}>
                        {track.title}
                      </div>
                      <div className="text-sm text-gray-500">{track.artist}</div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {trackDurations[index] ? formatTime(trackDurations[index]) : "--:--"}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
