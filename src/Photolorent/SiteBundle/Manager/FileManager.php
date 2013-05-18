<?php

namespace Photolorent\SiteBundle\Manager;


use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class FileManager
{
    protected $rootPath;

    /**
     * @param string $rootPath
     */
    public function __construct($rootPath)
    {
        $this->rootPath = realpath($rootPath . '/../web/uploads/');
    }

    /**
     * Get an array of SplFileInfo representing files found for the directory provided
     *
     * @param string $directory
     *  Relative path from the uploads directory
     *  This could be a pattern used by the Finder like mariages/*
     *
     * @return array
     *  Array of SplFileInfo
     */
    public function getFiles($directory) {
        $finder = new Finder();

        $finder->in($this->rootPath . '/' . ltrim($directory, '/'))->sortByName();
        $finder->files()->name('*.jpg');

        $files = array();
        /** @var $file SplFileInfo */
        foreach($finder as $file) {
            $files[] = $file;
        }

        return $files;

    }

    /**
     * @param array $files
     *  Array of SplFileInfo
     *
     * @return array
     *  Array of strings container the relative paths to the file
     */
    public function getPaths($files)
    {
        $paths = array();
        foreach($files as $file) {
            $paths[] = $this->getPath($file);
        }

        return $paths;
    }

    /**
     * @param SplFileInfo $file
     *
     * @return string
     *  Relative path to the uploads directory
     */
    public function getPath(SplFileInfo $file)
    {
        return 'uploads/' . basename($file->getPath()) . '/' . $file->getFilename();
    }

    /**
     * @param SplFileInfo $file
     *
     * @return string
     *  The image binary content
     */
    public function getFileContent(SplFileInfo $file)
    {
        return $file->getContents();
    }




}