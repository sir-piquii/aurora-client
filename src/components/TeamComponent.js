import React, { useState, useEffect } from 'react';
import { getTeam, BASE_URL } from "../api";

/**
 * Team component fetches and displays a list of team members.
 *
 * - Fetches team member data asynchronously on mount using `getTeam`.
 * - Displays each member's photo, name, position, and bio in a responsive grid.
 * - Includes hover effects for additional member details.
 *
 * @component
 * @returns {JSX.Element} The rendered Team section with team members.
 */
function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamMembers = await getTeam();
        setTeamMembers(teamMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>

      <div className="w-9/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative group overflow-hidden rounded-lg shadow-lg h-[24rem]"
          >
            <img
              src={`${BASE_URL}/team/${member.picture}`}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-500 flex items-center justify-center transform -translate-x-full group-hover:translate-x-0">
              <div className="p-4 text-white text-center">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-md">{member.position}</p>
                <p className="text-sm mt-2">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
