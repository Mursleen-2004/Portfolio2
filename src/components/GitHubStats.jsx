import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaStar, FaCodeBranch, FaUsers, FaUserFriends, FaGithub, FaExternalLinkAlt, FaRedo } from "react-icons/fa";

const GITHUB_USERNAME = "Mursleen-2004";
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Vue: "#41b883",
  PHP: "#4F5D95",
};

const getLangColor = (lang) => LANG_COLORS[lang] || "#8b949e";

// Skeleton loader
const SkeletonCard = ({ isDark }) => (
  <div
    className={`rounded-2xl p-5 animate-pulse ${
      isDark ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"
    }`}
  >
    <div className={`h-4 w-16 rounded mb-3 ${isDark ? "bg-white/10" : "bg-gray-300"}`} />
    <div className={`h-8 w-20 rounded mb-2 ${isDark ? "bg-white/10" : "bg-gray-300"}`} />
    <div className={`h-3 w-24 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
  </div>
);

const SkeletonRepo = ({ isDark }) => (
  <div
    className={`rounded-xl p-4 animate-pulse ${
      isDark ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"
    }`}
  >
    <div className={`h-4 w-32 rounded mb-2 ${isDark ? "bg-white/10" : "bg-gray-300"}`} />
    <div className={`h-3 w-full rounded mb-1 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
    <div className={`h-3 w-3/4 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
  </div>
);

const StatCard = ({ icon: Icon, label, value, color, isDark, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`rounded-2xl p-5 flex flex-col gap-2 backdrop-blur-md ${
      isDark
        ? "bg-white/5 border border-white/10 text-white"
        : "bg-white/80 border border-gray-200 text-gray-800 shadow-md"
    }`}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon size={18} style={{ color }} />
    </div>
    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold" style={{ color }}>
      {value.toLocaleString()}
    </div>
    <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}>
      {label}
    </div>
  </motion.div>
);

const RepoCard = ({ repo, isDark, index }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
    whileHover={{ y: -3, scale: 1.01 }}
    className={`rounded-xl p-4 block group transition-all duration-200 ${
      isDark
        ? "bg-white/5 border border-white/10 hover:border-[#F59E0B]/40 hover:bg-white/8"
        : "bg-white border border-gray-200 hover:border-yellow-400/60 hover:shadow-md"
    }`}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2 min-w-0">
        <FaGithub size={14} className={isDark ? "text-gray-400 flex-shrink-0" : "text-gray-500 flex-shrink-0"} />
        <span
          className={`text-sm font-semibold truncate ${
            isDark ? "text-[#F59E0B] group-hover:text-[#ffe989]" : "text-yellow-600 group-hover:text-yellow-700"
          }`}
        >
          {repo.name}
        </span>
      </div>
      <FaExternalLinkAlt
        size={11}
        className={`flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      />
    </div>
    <p
      className={`text-xs leading-relaxed mb-3 line-clamp-2 ${
        isDark ? "text-gray-400" : "text-gray-500"
      }`}
    >
      {repo.description || "No description provided."}
    </p>
    <div className="flex items-center gap-3">
      {repo.language && (
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: getLangColor(repo.language) }}
          />
          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {repo.language}
          </span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <FaStar size={11} className="text-yellow-400" />
        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {repo.stargazers_count}
        </span>
      </div>
    </div>
  </motion.a>
);

const GitHubStats = () => {
  const { isDark } = useTheme();

  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

      const user = await userRes.json();
      const repoData = await reposRes.json();

      setUserData(user);
      setRepos(Array.isArray(repoData) ? repoData : []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Compute stats
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

  // Top 5 languages
  const langCounts = {};
  repos.forEach((r) => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });
  const sortedLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxLangCount = sortedLangs[0]?.[1] || 1;

  // 6 most recently updated repos
  const recentRepos = [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 6);

  const sectionBg = isDark ? "" : "bg-[#F8FAFC]";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subColor = isDark ? "text-gray-400" : "text-gray-500";
  const accentColor = isDark ? "text-[#F59E0B]" : "text-yellow-600";
  const langLabelColor = isDark ? "text-gray-300" : "text-gray-700";
  const langCountColor = isDark ? "text-gray-500" : "text-gray-400";
  const sectionLabelColor = isDark ? "text-gray-300" : "text-gray-700";
  const cardBg = isDark ? "bg-white/5 border border-white/10" : "bg-white/80 border border-gray-200 shadow-md";

  return (
    <section
      id="github"
      className={`py-16 sm:py-20 px-4 sm:px-6 md:px-10 relative overflow-hidden ${sectionBg}`}
    >
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-5xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-3 ${headingColor}`}>
            GitHub <span className={accentColor}>Activity</span>
          </h2>
          <p className={`text-sm md:text-base ${subColor}`}>
            Open source contributions and project highlights
          </p>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#22D3EE]" />
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <p className={`text-lg font-medium ${isDark ? "text-red-400" : "text-red-600"}`}>
              Failed to load GitHub data
            </p>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#F59E0B] text-black font-bold text-sm hover:bg-[#ffe989] transition-colors"
            >
              <FaRedo size={13} /> Try Again
            </button>
          </motion.div>
        )}

        {!error && (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} isDark={isDark} />)
              ) : (
                <>
                  <StatCard icon={FaCodeBranch} label="Public Repos" value={userData?.public_repos || 0} color="#F59E0B" isDark={isDark} index={0} />
                  <StatCard icon={FaStar} label="Total Stars" value={totalStars} color="#22D3EE" isDark={isDark} index={1} />
                  <StatCard icon={FaUsers} label="Followers" value={userData?.followers || 0} color="#a78bfa" isDark={isDark} index={2} />
                  <StatCard icon={FaUserFriends} label="Following" value={userData?.following || 0} color="#f97316" isDark={isDark} index={3} />
                </>
              )}
            </div>

            {/* Two-column: Languages + Repos */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Top Languages */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-2xl p-6 backdrop-blur-md ${cardBg}`}
              >
                <h3 className={`font-bold text-base mb-5 ${headingColor}`}>
                  Top Languages
                </h3>
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className={`h-3 w-20 rounded animate-pulse ${isDark ? "bg-white/10" : "bg-gray-300"}`} />
                        <div className={`h-2.5 rounded-full animate-pulse ${isDark ? "bg-white/10" : "bg-gray-200"}`} style={{ width: `${60 + i * 5}%` }} />
                      </div>
                    ))}
                  </div>
                ) : sortedLangs.length === 0 ? (
                  <p className={`text-sm ${subColor}`}>No language data available.</p>
                ) : (
                  <div className="space-y-4">
                    {sortedLangs.map(([lang, count], i) => {
                      const pct = Math.round((count / maxLangCount) * 100);
                      return (
                        <div key={lang}>
                          <div className="flex justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: getLangColor(lang) }}
                              />
                              <span className={`text-sm font-medium ${langLabelColor}`}>{lang}</span>
                            </div>
                            <span className={`text-xs ${langCountColor}`}>{count} repo{count > 1 ? "s" : ""}</span>
                          </div>
                          <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: getLangColor(lang) }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Recent Repos */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-2xl p-6 backdrop-blur-md ${cardBg}`}
              >
                <h3 className={`font-bold text-base mb-5 ${headingColor}`}>
                  Recent Repositories
                </h3>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <SkeletonRepo key={i} isDark={isDark} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 overflow-y-auto max-h-72 pr-1 scrollbar-thin">
                    {recentRepos.slice(0, 4).map((repo, i) => (
                      <RepoCard key={repo.id} repo={repo} isDark={isDark} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* All Recent Repos grid */}
            {!loading && recentRepos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h3 className={`font-bold text-base mb-5 ${sectionLabelColor}`}>
                  All Recent Repositories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {recentRepos.map((repo, i) => (
                    <RepoCard key={repo.id} repo={repo} isDark={isDark} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contribution Graph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl p-6 backdrop-blur-md mb-10 ${cardBg}`}
            >
              <h3 className={`font-bold text-base mb-4 ${headingColor}`}>
                Contribution Graph
              </h3>
              <div className="overflow-x-auto rounded-xl">
                <img
                  src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                  alt={`${GITHUB_USERNAME} GitHub contribution chart`}
                  className="w-full min-w-[600px] rounded-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#F59E0B] text-black font-bold text-sm hover:bg-[#ffe989] transition-colors shadow-lg hover:shadow-yellow-400/20"
              >
                <FaGithub size={16} />
                View Full Profile →
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubStats;
