import { useState } from 'react'

const ConfigDashboard = ({ onInitBroadcast }) => {
  const [homeTeam, setHomeTeam] = useState({
    location: '',
    name: '',
    abbreviation: '',
    record: '0-0-0',
    primaryColor: '#ff0000',
    secondaryColor: '#ffffff',
    logo: null,
    offenseWeight: 50,
    defenseWeight: 50,
    specialTeamsWeight: 50,
  })

  const [awayTeam, setAwayTeam] = useState({
    location: '',
    name: '',
    abbreviation: '',
    record: '0-0-0',
    primaryColor: '#0000ff',
    secondaryColor: '#ffffff',
    logo: null,
    offenseWeight: 50,
    defenseWeight: 50,
    specialTeamsWeight: 50,
  })

  const [leagueLogo, setLeagueLogo] = useState(null)

  const handleTeamChange = (team, field, value) => {
    if (team === 'home') {
      setHomeTeam({ ...homeTeam, [field]: value })
    } else {
      setAwayTeam({ ...awayTeam, [field]: value })
    }
  }

  const handleLogoUpload = (team, file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (team === 'home') {
        setHomeTeam({ ...homeTeam, logo: reader.result })
      } else {
        setAwayTeam({ ...awayTeam, logo: reader.result })
      }
    }
    if (file) reader.readAsDataURL(file)
  }

  const handleLeagueLogoUpload = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setLeagueLogo(reader.result)
    }
    if (file) reader.readAsDataURL(file)
  }

  const handleInitialize = () => {
    if (
      homeTeam.location &&
      homeTeam.name &&
      homeTeam.abbreviation &&
      awayTeam.location &&
      awayTeam.name &&
      awayTeam.abbreviation
    ) {
      onInitBroadcast(homeTeam, awayTeam, leagueLogo)
    } else {
      alert('Please fill in all required team fields')
    }
  }

  const TeamPanel = ({ team, title, onChange, onLogoUpload }) => (
    <div className="glass p-8 rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-neon-cyan font-orbitron">{title}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-orbitron mb-2">Location Name</label>
          <input
            type="text"
            value={team.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full bg-dark-surface border border-neon-cyan rounded px-3 py-2 text-white font-orbitron focus:outline-none focus:neon-glow"
            placeholder="e.g., Los Angeles"
          />
        </div>

        <div>
          <label className="block text-sm font-orbitron mb-2">Team Name</label>
          <input
            type="text"
            value={team.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full bg-dark-surface border border-neon-cyan rounded px-3 py-2 text-white font-orbitron focus:outline-none focus:neon-glow"
            placeholder="e.g., Xtreme"
          />
        </div>

        <div>
          <label className="block text-sm font-orbitron mb-2">3-Letter Abbreviation</label>
          <input
            type="text"
            value={team.abbreviation}
            onChange={(e) => onChange('abbreviation', e.target.value.toUpperCase())}
            maxLength="3"
            className="w-full bg-dark-surface border border-neon-cyan rounded px-3 py-2 text-white font-orbitron focus:outline-none focus:neon-glow"
            placeholder="e.g., LAZ"
          />
        </div>

        <div>
          <label className="block text-sm font-orbitron mb-2">Record (W-L-T)</label>
          <input
            type="text"
            value={team.record}
            onChange={(e) => onChange('record', e.target.value)}
            className="w-full bg-dark-surface border border-neon-cyan rounded px-3 py-2 text-white font-orbitron focus:outline-none focus:neon-glow"
            placeholder="0-0-0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-orbitron mb-2">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={team.primaryColor}
                onChange={(e) => onChange('primaryColor', e.target.value)}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <span className="text-xs font-orbitron">{team.primaryColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-orbitron mb-2">Secondary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={team.secondaryColor}
                onChange={(e) => onChange('secondaryColor', e.target.value)}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <span className="text-xs font-orbitron">{team.secondaryColor}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-orbitron mb-2">Team Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onLogoUpload(e.target.files[0])}
            className="w-full text-xs"
          />
          {team.logo && (
            <img src={team.logo} alt="Team Logo" className="mt-2 h-16 w-16 rounded" />
          )}
        </div>

        <div className="border-t border-neon-cyan pt-4 mt-4">
          <h3 className="text-sm font-orbitron font-bold mb-4 text-neon-yellow">AI Weight Profiles (1-99)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-orbitron mb-2">
                Offense: {team.offenseWeight}
              </label>
              <input
                type="range"
                min="1"
                max="99"
                value={team.offenseWeight}
                onChange={(e) => onChange('offenseWeight', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">
                {team.offenseWeight > 50 ? 'Passing Aggression' : 'Conservative Running'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-orbitron mb-2">
                Defense: {team.defenseWeight}
              </label>
              <input
                type="range"
                min="1"
                max="99"
                value={team.defenseWeight}
                onChange={(e) => onChange('defenseWeight', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">
                {team.defenseWeight > 50 ? 'Man Coverage' : 'Zone Coverage'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-orbitron mb-2">
                Special Teams: {team.specialTeamsWeight}
              </label>
              <input
                type="range"
                min="1"
                max="99"
                value={team.specialTeamsWeight}
                onChange={(e) => onChange('specialTeamsWeight', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">Field Goal Accuracy & Blocking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full h-full bg-black overflow-auto py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-neon-cyan text-center font-orbitron text-glow">
          XSFL BROADCAST ENGINE
        </h1>
        <p className="text-center text-neon-yellow mb-12 font-orbitron">Executive Configuration Dashboard</p>

        {/* League Logo */}
        <div className="glass p-8 rounded-lg mb-8 w-full">
          <h2 className="text-2xl font-bold mb-4 text-neon-cyan font-orbitron">League Branding</h2>
          <div>
            <label className="block text-sm font-orbitron mb-2">League Logo (Watermark Override)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLeagueLogoUpload(e.target.files[0])}
              className="w-full text-xs"
            />
            {leagueLogo && (
              <img src={leagueLogo} alt="League Logo" className="mt-4 h-24 rounded" />
            )}
          </div>
        </div>

        {/* Team Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TeamPanel
            team={homeTeam}
            title="HOME TEAM"
            onChange={(field, value) => handleTeamChange('home', field, value)}
            onLogoUpload={(file) => handleLogoUpload('home', file)}
          />
          <TeamPanel
            team={awayTeam}
            title="AWAY TEAM"
            onChange={(field, value) => handleTeamChange('away', field, value)}
            onLogoUpload={(file) => handleLogoUpload('away', file)}
          />
        </div>

        {/* Initialize Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleInitialize}
            className="glass px-12 py-4 text-xl font-bold font-orbitron text-neon-cyan border-2 border-neon-cyan neon-glow hover:bg-neon-cyan hover:text-black transition-all duration-300 rounded"
          >
            INITIALIZE BROADCAST
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfigDashboard
